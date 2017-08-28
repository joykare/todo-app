const Todos = require("../models/todos.js");
const _ = require("underscore");

module.exports = {
  add: (req, res) => {
    let todo = new Todos();

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.dueDate = req.body.dueDate;

    todo.save((err) => {
      if (err) {
        return res.status(500).send({
          message: "Error occured saving your todo"
        })
      } else {
        return res.status(200).send({
          message: "Todo saved successfully"
        })
      }
    })
  },
  find: (req, res) => {
    Todos.find({}, (err, todos) => {
      if (err) {
        res.status(500).send({
          message: "Error occured while finding"
        })
      } else {
        res.status(200).send(_.sortBy(todos, "dueDate"));
      }
    })
  },

  // edit: (req, res) => {

  // },

  // delete: (req, res) => {

  // }
}