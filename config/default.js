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
    file: "reptile",
    level: "debug",
    start: false,
    html: false
  }
};
