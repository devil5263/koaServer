const nunjucks = require("nunjucks");
const config = require("config-lite");

const env = nunjucks.configure(config.static, {
  throwonUndefined: true,
  watch: config.debug,
  autoescape: false
});

env.addGlobal("debug", config.debug);

module.exports = nunjucks.render;
