module.exports = {
  debug: true,
  port: 8088,
  static: "source/",
  mongo: {
    url: "mongodb://localhost:27017/lagou"
  },
  log: {
    path: ".",
    file: "app",
    level: "debug"
  },
  reptile: {
    microBlog: 3, // each houre
    dynamicIp: 30, // each minute
    file: "reptile",
    level: "debug",
    begin: false,
    html: false,
    start: 1, // houre
    stop: 24 // houre
  }
};
