const config = require("config-lite");
const tracer = require("tracer");
const fs = require("fs");
const assert = require("assert");
const moment = require("moment");

assert(config.log && config.log.file && config.log.level, "CONFIG missing log in config");

const consoleLogger = tracer.colorConsole({
  format : "{{timestamp}} [{{path}}:{{line}}] <{{title}}> {{message}}",
    level: config.log.level,
    inspectOpt: {
        showHidden : true,
        depth : 3
    }
});

const fileLogger = tracer.console({
  level: config.log.level,
  transport: (data) => {
    const file = `${config.log.path}/app.${moment().format("YYYYMMDD")}.log`;
    fs.appendFile(file, data.output + "\n", (err) => {
        if (err) { throw err; }
    });
  }
});

const reptileLogger = tracer.console({
  level: config.reptile.level,
  transport: (data) => {
    const file = `${config.log.path}/reptile.${moment().format("YYYYMMDD")}.log`;
    fs.appendFile(file, data.output + "\n", (err) => {
        if (err) { throw err; }
    });
  }
});

async function loggerMiddleware(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  const msg = `${ctx.method} ${ctx.url} - ${ms}ms`;

  consoleLogger.info(msg);
  fileLogger.info(msg);
}

module.exports = {
  consoleLogger,
  fileLogger,
  reptileLogger,
  loggerMiddleware
};
