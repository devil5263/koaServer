const router = require("koa-router")({ prefix: "/users" });
const { User } = require("../models");
const ajv = require("ajv")();
const assert = require("assert");
const { CommonError } = require("../error");

const loginValidater = ajv.compile({
  properties: {
    id: { type: "string" },
    passwd: { type: "string" }
  },
  required: ["id", "passwd"],
  $async: true,
  additionalProperties: false
});
router.post("/login", async (ctx) => {
  await loginValidater(ctx.request.fields);
  const { id, passwd } = ctx.request.fields;
  const user = await User.findOne({ id: id, passwd: passwd });
  assert(user, 403);
  ctx.body = user;
});

const createValidater = ajv.compile({
  properties: {
    id: { type: "string", maxLength: 10, minLength: 3 },
    passwd: { type: "string", minLength: 6 },
    information: {
      properties: {
        email: { type: "string", format: "email" },
        phone: { type: "string", maxLength: 11, minLength: 11 },
        qq: { type: "string", minLength: 4 }
      },
      required: ["email", "phone"],
      additionalProperties: false
    }
  },
  $async: true,
  additionalProperties: false,
  required: ["id", "passwd", "information"]
});
router.post("/create", async (ctx) => {
  await createValidater(ctx.request.fields);
  const idUser = await User.find({ id: ctx.request.fields.id });
  ctx.assert(!idUser, new CommonError(1000, "id exiest"));
  const user = await User(ctx.request.fields).save();

  ctx.body = user;
});

module.exports = router;
