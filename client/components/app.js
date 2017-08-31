import React, { Component } from "react";
import request from "superagent";

const style = {
  display: "inline-block",
  padding: "0 25px",
  fontSize: "16px",
  lineHeight: "30px",
  margin: "10px 0 10px 0",
  borderRadius: "25px",
  backgroundColor: "#f1f1f1"
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [],
      date: "",
      title: "",
      description: ""
    }
  }

  componentWillMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    request
      .get("http://localhost:3000/api/todos")
      .then((res) => {
        // console.log("todos", res.body);
        this.setState({
          todos: res.body
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("date", this.state.date);
    request
      .post("http://localhost:3000/api/todos")
      .send({
        title: this.state.title,
        description: this.state.description,
        dueDate: new Date(`${this.state.date}`)
      })
      .then((res) => {
        // console.log("todos", res.body);
        this.fetchTodos();
      })
  }

  handleComplete = (id) => {
    request
    .post(`http://localhost:3000/api/todos/${id}`)
    .send({
      completed: true
    })
    .then((res) => {
      console.log("complete", res.body);
      this.fetchTodos();
    })
  }

  render() {
    console.log("this.state", this.state.todos);
    return (
      <div>
        <div className="text-center">
          <h4>Todo App</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{marginLeft: 250, marginRight: 250,}}>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter todo title"
                onBlur={(event) => {
                  this.setState({
                    title: event.target.value
                  })
                }}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter todo description"
                onBlur={(event) => {
                  this.setState({
                    description: event.target.value
                  })
                }}
              />
            </div>

            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter date in the format mm.dd.yyyy"
                onBlur={(event) => {
                  this.setState({
                    date: event.target.value
                  })
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Todo</button>
          </form>
        </div>

        {this.state.todos.length ? this.state.todos.map((todo) => (
          <div className="list-group" key={todo._id} style={{marginLeft: 100, marginRight: 100, marginTop: 20, marginBottom:20}}>
            <div className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{todo.title}</h5>
                <small>{todo.dueDate}</small>
              </div>
              {todo.completed && <div className="chip"  style={style}> Completed </div>}
              <p className="mb-1">{todo.description}</p>
              {!todo.completed &&
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleComplete(todo._id)}
                >
                  Mark as completed
                </button>
              }
            </div>
          </div>
        )) : <div className="loading">Loading..</div>}
      </div>


    );
  }
}

export default App;