const url = "192.168.101.128";

module.exports = {
  debug: true,
  port: 8088,
  mongo: {
    url: `mongodb://${url}:27017/lagou`
  },
  static: "dist",
  log: {
    path: ".",
    file: "app",
    level: "debug"
  },
  dynamicIp: {
    begin: false,
    fetch: 1, // minute
    test: 2, // minute
    clear: 3 // minute
  },
  reptile: {
    microBlog: 3,
    file: "reptile",
    level: "debug",
    begin: true,
    html: false
  }
};

