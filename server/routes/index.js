const todos = require("../controllers/todos.js");

module.exports = function(app) {
  app.post("/api/todos", todos.add);
  app.get("/api/todos", todos.find);

}