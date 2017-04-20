const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON_CONFIG } = require("./common");

const schema = new Schema({
  url: { type: String },
  index: { type: Number },
  success: { type: Boolean, default: true },
  times: { type: Number, default: 0 }
}, COMMON_CONFIG);

module.exports = mongoose.model("url", schema);
