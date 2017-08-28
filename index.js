const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const seed = require("./util/seed.js")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/todo', (err) => {
  if(err) {
    console.log("Error occured on db setup", err);
  } else {
    console.log("DB connected");
  }
});

mongoose.connection.on("connected", (err) => {
  Todo.remove({}, () => {
    if(err){
      console.log("error on removed");
    } else {
      console.log("Todos removed")
    }
  });

  Todo.create(seed.todos, () => {
    if (err) {
      console.log("error on created");
    } else {
      console.log("Todos created");
    }
  })
})

app.listen(3000, (err) => {
  if (err) {
    console.log("Error occured", err);
  } else {
    console.log("App listening on port 3000")
  }
})

module.exports = app;