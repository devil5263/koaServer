const request = require("request-promise");
const Microbloghot = require("../src/models/microbloghot");
const { consoleLogger, reptileLogger } = require("../src/middlewares/logger");

const url = "http://s.weibo.com/ajax/jsonp/gettopsug?uid=&ref=PC_topsug&url=http%3A%2F%2Fweibo.com%2F&Mozilla=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F57.0.2987.133%20Safari%2F537.36&_cb=STK_14957775897813" // eslint-disable-line

function decode(s) {
    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, "%$1"));
}
module.exports = async () => {
    await request({
        method: "GET",
        url: url,
        resolveWithFullResponse: true
    }).then(async (resp) => {
        let hots = resp.body.match(/"list.*\}\]/g);
        hots = decode(hots[0]);
        hots = JSON.parse("{" + hots + "}");
        consoleLogger.info("fetch microblog hot done");
        await Microbloghot({ hots: hots.list }).save();
    }).catch(err => {
        consoleLogger.info(err);
        reptileLogger.msg(err);
        return;
    });
};
