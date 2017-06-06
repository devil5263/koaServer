const request = require("request-promise");
const schedule = require("node-schedule");
const config = require("config-lite");
const Proxyips = require("../src/models/proxyip");
const { consoleLogger } = require("../src/middlewares/logger");

const httpProxyApi = "http://api.xicidaili.com/free2016.txt";

async function testIps() {
    const ips = await Proxyips.find({ times: { $gte: 0 } })
        .sort({ times: 1, created_at: -1 })
        .limit(10);
    const ipsConnect = [];
    return new Promise((reslove, reject) => {
        ips.forEach(async (ip) => {
            try {
                await request({
                    method: "GET",
                    timeout: 1000,
                    uri: "https://segmentfault.com/a/1190000009635991",
                    proxy: `http://${ip.path}:${ip.port}`,
                    resolveWithFullResponse: true
                }).then(resp => {
                    console.log(`${ip.path}: resp`)
                    ipsConnect.push({
                        updateOne: {
                            filter: { _id: ip._id },
                            update: { times: ip.times + 1 }
                        }
                    });
                }).catch(err => {
                    consoleLogger.info(`${ip.path}: err`)
                    ipsConnect.push({
                        updateOne: {
                            filter: { _id: ip._id },
                            update: { times: ip.times - 1 }
                        }
                    });
                });
            } catch (e) {
                consoleLogger.info(`test connect ${ip.path} fail`)
            }
        })
        reslove(ipsConnect);
    });
}

module.exports = async () => {
    let ips = [];
    await request({
        method: "GET",
        uri: httpProxyApi,
        resolveWithFullResponse: true
    }).then(async (resp) => {
        if (resp.statusCode === 200) {
            resp.body.split("\r\n").map(url => {
                let temp = url.split(":");
                ips.push({
                    path: temp[0],
                    port: temp[1]
                });
            });
        } else {
            consoleLogger.info("fetch proxy ips fail");
            return;
        }
    })
    .catch(err => {
        consoleLogger.info(err);
        return;
    });
    await Proxyips.insertMany(ips, { ordered: false });
    const updateIps = await testIps();
    await Proxyips.bulkWrite(updateIps);
};

