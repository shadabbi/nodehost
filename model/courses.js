const mongoose = require("mongoose");

const schema = mongoose.Schema({
  department: String,
  course: [
    {
      imgUrl: String,
      title: String,
      seats: String,
      shift: String,
    },
  ],
});

module.exports = mongoose.model("course", schema);
