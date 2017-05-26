const schedule = require("node-schedule");
const lagouData = require("./lagouData");
const config = require("config-lite");
const microBlog = require("./microBlog");

module.exports = function() {
    schedule.scheduleJob(`* * ${config.reptile.microBlog} * * *`, microBlog());
    if (config.reptile.begin) {
         schedule.scheduleJob(`* * ${config.reptile.start} * * *`, lagouData());
    };
};
