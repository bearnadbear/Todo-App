import { useState } from "react";
import "./App.css";

function TodoItem({ todo, update }) {
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  function changeTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let pos = todo.id;
    let body = {
      data: {
        item,
      },
    };

    fetch(`http://localhost:1337/api/new-todos/${pos}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setEdit(false);
      update();
    });
  }

  function deleteTodo(e) {
    e.preventDefault();
    let pos = todo.id;

    fetch(`http://localhost:1337/api/new-todos/${pos}`, {
      method: "DELETE",
    }).then(() => {
      update();
    });
  }

  return (
    <div className="todo">
      {!edit ? (
        <div className="name">{todo.attributes.item}</div>
      ) : (
        <form onSubmit={changeTodo}>
          <input
            className="todo_input"
            type="text"
            placeholder="Enter new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.currentTarget.value)}
          />
          <button className="todo_button" type="submit">
            Change todo
          </button>
        </form>
      )}
      <div>
        <button className="delete" onClick={deleteTodo}>
          delete
        </button>
        <button
          className="edit"
          onClick={() => {
            setEdit(!edit);

            setNewTodo(todo.attributes.item);
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
