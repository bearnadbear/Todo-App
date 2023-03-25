import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    update();
  }, []);

  function update() {
    fetch("http://localhost:1337/api/new-todos")
      .then((res) => res.json())
      .then((todo) => {
        setTodos(todo.data);
      });
  }

  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item,
      },
    };

    fetch("http://localhost:1337/api/new-todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setNewTodo("");
      update();
    });
  }

  return (
    <div className="app">
      <main>
        <form className="form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo_input"
            placeholder="Enter new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.currentTarget.value)}
          />
          <button type="submit" className="todo_button">
            Add todo
          </button>
        </form>

        <div>
          {todos.map((todo, i) => {
            return <TodoItem todo={todo} key={i} update={update} />;
          })}
        </div>
      </main>
    </div>
  );
}
export default App;
