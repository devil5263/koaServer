module.exports = {
  debug: true,
  port: 8088,
  mongo: {
    url: "mongodb://192.168.189.128:27017/lagou"
  },
  static: "dist",
  log: {
    path: ".",
    file: "app",
    level: "debug"
  },
  dynamicIp: {
    fetch: 3, // minute
    test: 1, // minute
    clear: 3 // minute
  },
  reptile: {
    microBlog: 3,
    file: "reptile",
    level: "debug",
    start: false,
    html: false,
    start: 1, // houre
    stop: 5 // houre
  }
};
