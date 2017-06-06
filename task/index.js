const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");
const microBlog = require("./microBlog");
const fetchIps = require("./dynamicIp");

module.exports = function() {
    // second minute hour day-month month day-week
    schedule.scheduleJob(`* ${config.reptile.dynamicIp} * * * *`, fetchIps());
    schedule.scheduleJob(`* * ${config.reptile.microBlog} * * *`, microBlog());
    if (config.reptile.begin) {
         schedule.scheduleJob(`* * ${config.reptile.start} * * *`, lagouData());
    };
};
