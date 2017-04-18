module.exports = {
  debug: true,
  port: 8080,
  mongo: {
    url: "mongodb://localhost:27017/lagou"
  },
  log: {
    file: "app.log",
    level: "debug"
  }
};
