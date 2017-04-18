const router = require("koa-router")();

const routers = ["user"];

routers.forEach((each) => {
  const r = require(`./${each}`);
  router.use(r.routes(), r.allowedMethods());
});

router.get("/", (ctx) => {
  ctx.body = "Hello Leo This Is Your Server";
});

module.exports = router;
