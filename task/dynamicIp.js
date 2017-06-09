const request = require("request-promise");
const Proxyips = require("../src/models/proxyip");
const ping = require("../utils/ping");
const { consoleLogger, reptileLogger } = require("../src/middlewares/logger");

const httpProxyApi = "http://api.xicidaili.com/free2016.txt";

async function pingIps () {
    const ips = await Proxyips.find({ times: { $gte: 0 } })
        .sort({ times: -1, created_at: -1 });
    const limitNumber = ips.length;
    const result = [];
    const connect = {
        alive: 0,
        dead: 0
    };
    return new Promise((reslove) => {
        ips.forEach(async (ip, index) => {
            await ping(ip)
            .then( function (res) {
                if (res.alive) {
                    connect.alive ++;
                    result.push({
                        updateOne: {
                            filter: { _id: ip._id },
                            update: { times: ip.times + 1 }
                        }
                    });
                } else {
                    connect.dead ++;
                    result.push({
                        updateOne: {
                            filter: { _id: ip._id },
                            update: { times: ip.times - 1 }
                        }
                    });
                }
            }).catch(() => {
                connect.dead ++;
                result.push({
                    updateOne: {
                        filter: { _id: ip._id },
                        update: { times: ip.times - 1 }
                    }
                });
            });
            if (index === limitNumber - 1) {
                consoleLogger.info(`ping ips alive: ${connect.alive}, dead: ${connect.dead}`);
                reptileLogger.info(`ping ips alive: ${connect.alive}, dead: ${connect.dead}`);
                reslove(result);
            }
        });
   });
}

async function testIps () {
    const result = await pingIps();
    await Proxyips.bulkWrite(result);
}

async function fetchIps () {
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
            await Proxyips.insertMany(ips, { ordered: false });
            consoleLogger.info(`fetch ${ips.length} ips done`);
            reptileLogger.info(`fetch ${ips.length} ips done`);
        } else {
            consoleLogger.info("fetch proxy ips fail");
            reptileLogger.info("fetch proxy ips fail");
        }
    })
    .catch((err) => {
        consoleLogger.info("fetch dynamicIps error: " + err.name);
        reptileLogger.info("fetch dynamicIps error: " + err.name);
    });
    await testIps();
    await clearPastIps();
};

async function clearPastIps () {
    const pastIps = await Proxyips.find({ times: { $lt: 0 } });
    const array = pastIps.map(pastIp => pastIp._id);
    await Proxyips.remove({ _id: { $in: array } });
    consoleLogger.info(`clear ${array.length} past ips done`);
    reptileLogger.info(`clear ${array.length} past ips done`);
};

async function getValidIp () {
    const ip = await Proxyips.find({ times: { $gt: 0 } })
        .sort({ times: -1 })
        .limit(1);
    return ip.length === 0 ? null : ip[0];
}

async function updateIp (ip, times) {
    await Proxyips.updateMany({ path: ip }, { $inc: { times: times } });
}

module.exports = {
    fetchIps, testIps, clearPastIps, getValidIp, updateIp
};
