const router = require("koa-router")();

const routers = ["user"];

routers.forEach((each) => {
  const r = require(`./${each}`);
  router.use(r.routes(), r.allowedMethods());
});

router.get("/", async (ctx) => {
  ctx.body = await ctx.render("index.html");
});

module.exports = router;
