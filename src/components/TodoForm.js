import { Button, Card, Form, Input, List } from "antd";
import { useEffect, useState } from "react";

import * as api from "../api";
import axios from "axios";
import { Content } from "antd/es/layout/layout";

export default function TodoForm() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    update();
  }, []);

  const update = () => {
    axios
      .get(api.url)
      .then(({ data }) => {
        setTodos(data.data);
      })
      .catch((error) => setError(error));
  };

  const createTodo = async () => {
    await axios
      .post(api.url, { data: todo })
      .then(() => {
        setTodo("");
        update();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const updateTodo = async (todoId) => {
    axios
      .put(`${api.url}/${todoId}`, {
        data: todo,
      })
      .then(() => {
        setLoading(false);
        update();
      });
  };

  const deleteTodo = async (todoId) => {
    axios.delete(`${api.url}/${todoId}`).then(() => update());
  };

  if (error) {
    console.log("Belum beruntung bang!");
  }

  return (
    <div>
      <Card className="card">
        <Form onFinish={createTodo}>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              className="space-1"
              type="date"
              value={todo.date}
              onChange={(e) =>
                setTodo({ ...todo, date: e.currentTarget.value })
              }
            />
          </Form.Item>

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
              value={todo.title}
              onChange={(e) =>
                setTodo({ ...todo, title: e.currentTarget.value })
              }
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
              placeholder="Masukan descriptionnya bang!"
              cols={100}
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.currentTarget.value })
              }
            />
          </Form.Item>

          <Button className="btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>

      <Card className="card">
        {todos.length === 0 && (
          <div>
            <span className="span-1">Loading sebentar ya bang ....</span>
            <pre className="span-2">{JSON.stringify(todo, null, "\t")}</pre>
          </div>
        )}
        {!loading ? (
          <List
            dataSource={todos}
            renderItem={({ id, attributes }) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() => {
                      setLoading(!loading);

                      setTodo(id);
                    }}
                  >
                    Update
                  </Button>,

                  <Button
                    className="delete"
                    onClick={deleteTodo.bind(this, id)}
                    danger
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Content>
                  <ul>
                    <li>
                      <span className="span-1">Date : </span>
                      <span className="span-2">{attributes.date}</span>
                    </li>
                    <li>
                      <span className="span-1">Title : </span>
                      <span className="span-2">{attributes.title}</span>
                    </li>
                    <li>
                      <span className="span-1">Description : </span>
                      <span className="span-2">{attributes.description}</span>
                    </li>
                  </ul>
                </Content>
              </List.Item>
            )}
          />
        ) : (
          <List
            dataSource={todos}
            renderItem={({ id, attributes }) => (
              <List.Item>
                <Content>
                  <Form onFinish={updateTodo.bind(this, id)}>
                    <Form.Item label="date" name="date">
                      <Input
                        className="space-1"
                        type="date"
                        defaultValue={attributes.date}
                        value={todo.date}
                        onChange={(e) =>
                          setTodo({ ...todo, date: e.currentTarget.value })
                        }
                      />
                    </Form.Item>

                    <Form.Item label="Title" name="title">
                      <Input
                        className="space-1"
                        defaultValue={attributes.title}
                        value={todo.title}
                        onChange={(e) =>
                          setTodo({ ...todo, title: e.currentTarget.value })
                        }
                      />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                      <Input.TextArea
                        className="space-2"
                        defaultValue={attributes.description}
                        cols={100}
                        value={todo.description}
                        onChange={(e) =>
                          setTodo({
                            ...todo,
                            description: e.currentTarget.value,
                          })
                        }
                      />
                    </Form.Item>

                    <Button className="btn" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form>
                </Content>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
}
