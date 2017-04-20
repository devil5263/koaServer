const app = require("../../src/app");
const request = require("supertest")(app.listen());
const User = require("../../src/models/user");
const assert = require("assert");

describe("USER APIS", () => {
  const user = {
    id: "testUserId",
    passwd: "111111",
    information: {
      email: "434330691@qq.com",
      phone: "18883285721",
      qq: "434330691"
    }
  };

  it("user create success", () => {
    return request.post("/users/create")
      .send(user)
      .expect(200)
      .then(async (resp) => {
        assert(resp.body);
        await User.remove({ _id: resp.body._id });
      });
  });

  it("login success", async () => {
    let dbUser = await User(user).save();
    return request.post("/users/login")
      .send({ id: user.id, passwd: user.passwd })
      .expect(200)
      .then(async (resp) => {
        await User.remove({ _id: dbUser._id });
        assert(resp.body._id, dbUser._id);
      });
  });
});
