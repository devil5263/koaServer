const process = require("process");
const app = require("./src/app");
const config = require("config-lite");
const logger = require("./src/middlewares/logger").consoleLogger;

app.listen(config.port, () => {
  logger.debug(`Sever start, listen on port ${config.port}`);
  logger.debug("Working dir: ", process.cwd());
  logger.debug("Config: ", config);
});
