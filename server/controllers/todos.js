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

  edit: (req, res) => {
    const todoId =  req.params.id;

    Todos.findOne({
      _id: todoId
    }, (err, todo) => {
      if (err) {
        res.status(500).send({
          message: 'An error occured when finding your todo'
        });
      } else {
        console.log("todo", todo);
        if (req.body.title) { todo.title = req.body.title; }
        if (req.body.description) { todo.description = req.body.description; }
        if (req.body.dueDate) { todo.dueDate = req.body.dueDate; }
        if (req.body.completed) { todo.completed = req.body.completed; }

        todo.save(function (err) {
          if (err) {
            res.status(500).send({
              message: 'An error occured when saving your todo'
            });
          } else {
            res.status(200).send({
              message: 'Todo has been updated'
            });
          }
        });
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

  delete: (req, res) => {
    Todos.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.status(500).send({
          message: "Error occured while deleting"
        })
      } else {
        res.status(200).send({
          message: "Todo deleted successfully"
        })
      }
    });

  }
}