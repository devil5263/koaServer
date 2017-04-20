module.exports = {
  debug: true,
  port: 8088,
  mongo: {
    url: "mongodb://localhost:27017/lagou"
  },
  log: {
    file: "app.log",
    level: "debug"
  },
  reptile: {
    file: "reptile.log",
    level: "debug"
  }
};
