import React, { Component } from "react";
import request from "superagent";

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
        console.log("todos", res.body);
        this.setState({
          todos: res.body
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    request
      .post("http://localhost:3000/api/todos")
      .send({
        title: this.state.title,
        description: this.state.description,
        dueDate: new Date(this.state.date)
      })
      .then((res) => {
        console.log("todos", res.body);
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

        <div className="jumbotron">
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
                placeholder="Enter todo due date"
                onBlur={(event) => {
                  this.setState({
                    date: event.target.value
                  })
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        {this.state.todos ? this.state.todos.map((todo) => (
          <div className="list-group" key={todo._id} style={{marginLeft: 100, marginRight: 100, marginTop: 20, marginBottom:20}}>
            <div className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{todo.title}</h5>
                <small>{todo.dueDate}</small>
              </div>
              <p className="mb-1">{todo.description}</p>
            </div>
          </div>
        )) : <div>Loading..</div>}
      </div>


    );
  }
}

export default App;