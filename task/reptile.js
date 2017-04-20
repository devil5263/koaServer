const request = require("request-promise");
const cheerio = require("cheerio");
const Url = require("../src/models/url");
const Job = require("../src/models/job");
const { consoleLogger, reptileLogger } = require("../src/middlewares/logger");

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

async function fetchPage (url) {
  let rep = {
    uri: url,
    status: false,
    body: null,
    err: null
  };
  await request({ method: "GET", url: url, resolveWithFullResponse: true })
    .then(resp => {
      if (resp.statusCode === 200) {
        rep.status = true;
        rep.body = resp.body;
      } else {
        return;
      };
    })
    .catch(err => {
      rep.err = err.name;
      return;
    });
  let msg = `fetch ${rep.uri} ${rep.status} ${rep.err || ""}`;
  reptileLogger.info(msg);
  return rep;
}

async function fetchData (body) {
  const $ =  cheerio.load(body);
  const information = { request: [], describle: [] };
  const requests = $(".position-content-l .job_request p span");
  const describes = Array.from($(".content_l .job_bt div p"));
  let flag = 1;
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

async function goBaby (start) {
  while (start) {
    let url = `${baseUrl}${start}.html`;
    let isFetched = await Url.findOne({ url: url });
    if (isFetched) {
      start++;
      continue;
    };
    let resp = await fetchPage(url);
    let dbUrl = { url: url };
    if (!resp.status) {
      Object.assign(dbUrl, {
        success: false,
        times: 1,
        index: start
      });
    } else {
      const data = await fetchData(resp.body);
      await new Job(data).save();
      dbUrl.times = 1;
      dbUrl.index = start;
    }
    await Url(dbUrl).save();
    start++;
  };
};

module.exports = async function () {
  let start = await Url.find({}).sort({ "created_time": 1 }).limit(1);
  if (start.length === 0) {
    start.push({ index: 0 });
  };
  start = start[0].index + 1 || 0;
  goBaby(start);
};
