const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON_CONFIG } = require("./common");

const schema = new Schema({
  id: { type: String },
  passwd: { type: String },
  information: {
    email: { type: String },
    phone: { type: String },
    qq: { type: String }
  }
}, COMMON_CONFIG);

  module.exports = mongoose.model("user", schema);
