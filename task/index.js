const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");
const microBlog = require("./microBlog");
const { fetchIps, testIps, clearPastIps } = require("./dynamicIp");

module.exports = async function() {

    // second minute hour day-month month day-week

    if (config.reptile.begin){
        lagouData();
    };

    if (config.dynamicIp.begin){
        await fetchIps();
        schedule.scheduleJob(`0 ${config.dynamicIp.fetch} * * * *`, fetchIps);
        schedule.scheduleJob(`* ${config.dynamicIp.test} * * * *`, testIps);
        schedule.scheduleJob(`59 ${config.dynamicIp.clear} * * * *`, clearPastIps);
        schedule.scheduleJob(`0 0 ${config.reptile.microBlog} * * *`, microBlog);
    };
};
