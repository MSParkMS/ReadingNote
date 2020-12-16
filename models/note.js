const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const NoteScheme = new Scheme({
  id: String,
  title: String,
  comments: [String]
});

module.exports = mongoose.model("note", NoteScheme);
