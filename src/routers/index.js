const router = require("koa-router")();

router.get("/", async (ctx) => {
  ctx.body = "Hello Leo";
});

module.exports = router;
