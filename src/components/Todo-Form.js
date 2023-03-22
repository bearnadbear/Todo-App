import { Button, Card, Form, Input, List } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";

export default function TodoForm() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addHandler = () => {
    if (title || description) {
      setTodos([
        ...todos,
        { id: Date.now(), title: title, description: description, done: false },
      ]);
      setTitle("");
      setDescription("");
    }
  };

  const deleteHandler = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <>
      <div>
        <Card className="card">
          <Form onFinish={addHandler}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                className="space-1"
                placeholder="Masukan titlenya bang!"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Isi dulu bang",
                },
              ]}
            >
              <Input.TextArea
                className="space-2"
                placeholder="Masukin descriptionnya bang!"
                cols={100}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Item>

            <Button className="btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>

      <div>
        <>
          {title && description ? (
            <Card className="card">
              <span className="span-1">Loading sebentar ya bang ....</span>
            </Card>
          ) : (
            <Card className="card">
              <List
                dataSource={todos}
                renderItem={(todo) => (
                  <List.Item
                    actions={[
                      <Button onClick={() => deleteHandler(todo.id)} danger>
                        Delete
                      </Button>,
                    ]}
                  >
                    <Content>
                      <ul>
                        <li>
                          <span className="span-1">ID : </span>
                          <span className="span-2">{todo.id}</span>
                        </li>
                        <li>
                          <span className="span-1">Title : </span>
                          <span className="span-2">{todo.title}</span>
                        </li>
                        <li>
                          <span className="span-1">Description : </span>
                          <span className="span-2">{todo.description}</span>
                        </li>
                      </ul>
                    </Content>
                  </List.Item>
                )}
              />
            </Card>
          )}
        </>
      </div>
    </>
  );
}
