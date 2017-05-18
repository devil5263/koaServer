const request = require("request-promise");
const schedule = require("node-schedule");
const config = require("config-lite");
const { consoleLogger } = require("../src/middlewares/logger");

const httpProxyApi = "http://api.xicidaili.com/free2016.txt";

module.exports = async () => {
    let ips = [];
    await request({ method: "GET", url: httpProxyApi, resolveWithFullResponse: true })
        .then(resp => {
            if (resp.statusCode === 200) {
                resp.body.split("\r\n").map(url => {
                    let temp = url.split(":");
                    ips.push({
                        path: temp[0],
                        port: temp[1]
                    });
                });
            } else {
                return;
            }
        })
        .catch(err => {
            consoleLogger.msg(err);
            return;
        });
    return ips;
};

