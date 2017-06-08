const request = require("request-promise");
const cheerio = require("cheerio");
const Url = require("../src/models/url");
const Job = require("../src/models/job");
const fs = require("fs");
const config = require("config-lite");
const { consoleLogger, reptileLogger } = require("../src/middlewares/logger");
const { getValidIp, updateIp } = require("./dynamicIp");

const baseUrl = "http://www.lagou.com/jobs/";
function dataFormate(data) {
  if (!data instanceof Object) {
    consoleLogger.info("dataFormate need argument is Object");
    return;
  };
  const newData = Object.assign({}, data);
  for (let key in newData) {
    if ( typeof newData[key] === "string" ) {
      newData[key] = newData[key].replace(/\//g, "").trim();
    }
  }
  let { salary, publish, experience, describle, request } = newData;
  if (salary) {
    newData.salary = salary.replace(/k/ig, "000").split("-");
  };
  if (publish) {
    const today = new Date();
    let date = publish;
    date = date.replace("发布于拉勾网", "")
      .replace(/\//g, "").trim();
    if (date.indexOf("天前") !== -1) {
      date = new Date( today.getTime() - parseInt(date.slice(0, 1)) * 24000 * 3600 );
    } else if (date.indexOf(":") !== -1) {
      date = today;
    } else {
      date = new Date(date);
    }
    newData.publish = date;
  };
  if (experience) {

  //   experience = experience.match(/[0-9]/g);
  //   newData.experience = experience;
  };
  if (describle) {
    if (!describle instanceof Array) {
      consoleLogger.info("describle need argument is Array");
      return;
    };
    newData.describle = [];
    describle.forEach(each => {
      if (each.match(/[0-9]/g)) {
        newData.describle.push(each);
      }
    });
  };
  if (request) {
    if (!request instanceof Array) {
      consoleLogger.info("request need argument is Array");
      return;
    };
    newData.request = [];
    request.forEach(each => {
      if (each.match(/[0-9]/g)) {
        newData.request.push(each);
      }
    });
  };
  return newData;
};

async function fetchPage (option) {
  console.log("fetchPage: ", option)
  let rep = {
    url: option.url,
    status: false,
    body: null,
    err: null
  };
  await request(option)
    .then(async (resp) => {
      if (option.proxy) {
        await updateIp(option.proxy.split(":")[1].slice(2), 1);
      }
      if (resp.statusCode === 200) {
        rep.status = true;
        rep.body = resp.body;
      } else {
        return rep;
      };
    })
    .catch(async (err) => {
      if (option.proxy) {
        await updateIp(option.proxy.split(":")[1].slice(2), -5);
      }
      throw err.name;
    }).finally(() => {
      let msg = `fetch ${rep.uri} ${rep.status} ${rep.err || ""}`;
      reptileLogger.info(msg);
      return rep;
    });
}

async function fetchData (body, index) {
  const $ =  cheerio.load(body);
  const information = { request: [], describle: [] };
  const requests = $(".position-content-l .job_request p span");
  const describes = Array.from($(".content_l .job_bt div p"));
  let flag = 1;
  information.index = index;
  information.name = $(".position-content-l .name").text();
  information.company = $(".position-content-l .company").text();
  information.salary = $(".position-content-l .salary").text();
  information.publish = $(".position-content-l .publish_time").text();
  information.address = $(requests[1]).text();
  information.experience = $(requests[2]).text();
  information.education = $(requests[3]).text();
  information.type_ = $(requests[4]).text();
  describes.forEach( (each) => {
    if ($(each).text().indexOf("岗位职责") !== -1 || $(each).text().indexOf("职位描述") !== -1) {
      flag = 1;
      return;
    } else if ($(each).text().indexOf("任职要求") !== -1 || $(each).text().indexOf("岗位要求") !== -1) {
      flag = 0;
      return;
    };
    if (flag === 1) {
      information.request.push($(each).text());
    } else {
      information.describle.push($(each).text());
    };
  });
  return dataFormate(information);
};

async function saveHtml (body, index) {
  const htmlFile = `./html/${index}.html`;
  await fs.writeFile(htmlFile, body, (err) => {
    if (err) { reptileLogger.info(err); }
  });
};

async function goBaby (start) {
    let url = `${baseUrl}${start}.html`;
    let ip = await getValidIp();
    const option = {
      method: "GET",
      uri: `${baseUrl}${start}.html`
    };
    if (ip) {
      option.proxy = `http://${ip.path}:${ip.port}`;
    }
    let resp = await fetchPage(option).catch(e => {throw "gobaby throw" + e});
    console.log("1111111111111",resp)
    let dbUrl = { url: url };
    if (!resp.status) {
      Object.assign(dbUrl, {
        success: false,
        times: 1,
        index: start
      });
    } else {
      const data = await fetchData(resp.body, start);
      if (config.reptile.html) { await saveHtml(resp.body, start); };
      await new Job(data).save();
      dbUrl.times = 1;
      dbUrl.index = start;
    }
    let msg = `fetch ${resp.uri} ${resp.status} ${resp.err || ""}`;
    reptileLogger.info(msg);
    await Url(dbUrl).save();
};

module.exports = async function () {
  let start = await Url.find({}).sort({ "created_at": -1 }).limit(1);
  if (start.length === 0) {
    start.push({ index: 0 });
  };
  start = start[0].index + 1 || 0;
  while (start) {
    console.log("lagou data:　", start)
    await goBaby(start);
    start++;
  }
};
