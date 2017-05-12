const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");

module.exports = function() {
    if (config.reptile.start) {
         schedule.scheduleJob(`* * ${config.reptile.start} * * *`, lagouData("start"));
         schedule.scheduleJob(`* * ${config.reptile.stop} * * *`, lagouData("stop"));
    };
};
