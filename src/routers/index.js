const router = require("koa-router")();

router.get("/", (ctx) => {
  ctx.body = "Hello Leo This Is Your Server";
});

module.exports = router;
