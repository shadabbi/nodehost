const { text } = require("body-parser");
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: String,
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", schema);
