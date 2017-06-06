const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON_CONFIG } = require("./common");

const schema = new Schema({
  hots: { type: Array }
}, COMMON_CONFIG);

module.exports = mongoose.model("microbloghot", schema);
