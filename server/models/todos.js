const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  dueDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Todos", TodosSchema);