const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON_CONFIG } = require("./common");

const schema = new Schema({
    path: { type: String },
    port: { type: Number },
    times: { type: Number, default: 0 }
}, COMMON_CONFIG);

module.exports = mongoose.model("proxyip", schema);
