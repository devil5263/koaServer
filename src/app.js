const Koa = require("koa");
const router = require("./routers");
const app = new Koa();
const config = require("config-lite");
const betterBody = require("koa-better-body");
const loggerMiddleware = require("./middlewares/logger").loggerMiddleware;
const errHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");

//middlewares
app.use(betterBody());
app.use(loggerMiddleware);
app.use(errHandler);

//mongodb
mongoose.connect(config.mongo.url);
mongoose.Promise = Promise;
app.context.db = mongoose.connection;

//router
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports =  app;
