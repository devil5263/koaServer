const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");
const microBlog = require("./microBlog");
const { fetchIps, testIps, clearPastIps } = require("./dynamicIp");

module.exports = function() {
    fetchIps();
    if (config.reptile.begin){
        lagouData();
    };

    // second minute hour day-month month day-week
    schedule.scheduleJob(`* ${config.dynamicIp.fetch} * * * *`, fetchIps);
    schedule.scheduleJob(`* ${config.dynamicIp.test} * * * *`, testIps);
    schedule.scheduleJob(`* ${config.dynamicIp.clear} * * * *`, clearPastIps);
    schedule.scheduleJob(`* * ${config.reptile.microBlog} * * *`, microBlog);
    // if (config.reptile.begin) {
    //      schedule.scheduleJob({ start: config.reptile.start, end: config.reptile.stop,
    //           rule: "* * */1 * * *" }, lagouData);
    // };
};
