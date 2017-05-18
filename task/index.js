const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");

module.exports = function() {
    if (config.reptile.begin) {
         schedule.scheduleJob(`* * ${config.reptile.start} * * *`, lagouData());
    };
};
