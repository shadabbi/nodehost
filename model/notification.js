const mongoose = require("mongoose");

const schema = mongoose.Schema({
  notice: String,
});

module.exports = mongoose.model("notification", schema);
