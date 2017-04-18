const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COMMON_CONFIG = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    id: false
};

const schemas = {};
schemas.User = new Schema({
  id: { type: "string" },
  passwd: { type: "string" },
  information: {
    email: { type: "string" },
    phone: { type: "string" },
    qq: { type: "string" }
  }
}, COMMON_CONFIG);

for (let schema in schemas) {
  module.exports[schema] = mongoose.model(schema, schemas[schema]);
};
