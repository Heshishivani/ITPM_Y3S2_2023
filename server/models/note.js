//Import mongoose
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
});

const Note = mongoose.model("Note", noteSchema);

//Export Note
module.exports = Note;