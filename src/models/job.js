const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON_CONFIG } = require("./common");

const schema = new Schema({
  index: { type: Number },
  name: { type: String },
  company: { type: String },
  publish: { type: Date },
  salary: { type: Array },
  experience: { type: String },
  education: { type: String },
  address: { type: String },
  request: { type: Array },
  describle: { type: Array }
}, COMMON_CONFIG);

module.exports = mongoose.model("job", schema);
