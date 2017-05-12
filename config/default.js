module.exports = {
  debug: true,
  port: 8088,
  mongo: {
    url: "mongodb://localhost:27017/lagou"
  },
  log: {
    path: ".",
    file: "app",
    level: "debug"
  },
  reptile: {
    dynamicIp: 30, // minute
    file: "reptile",
    level: "debug",
    start: false,
    html: false,
    start: 1, // houre
    stop: 5 // houre
  }
};
