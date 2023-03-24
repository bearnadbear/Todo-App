import { Button, Card, Form, Input, List } from "antd";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";

import * as api from "../api";
import axios from "axios";

export default function TodoForm() {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // read Todo
  useEffect(() => {
    axios
      .get(api.url)
      .then(({ data }) => {
        setTodos(data.data);
        setLoading(false);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => setError(error));
  }, [todos]);

  // create Todo
  const createTodo = async () => {
    await axios
      .post(api.url, { data: todo })
      .catch((error) => {
        setError(error);
      })
      .then((res) => {
        console.log(res);
      });
  };

  // delete Todo
  const deleteTodo = async (todoId) => {
    axios.delete(`${api.url}/${todoId}`).then((res) => {
      console.log(res);
    });
  };

  // update Todo
  const updateTodo = async (todoId) => {
    axios
      .put(`${api.url}/${todoId}`, {
        data: {
          categories: [todoId],
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  if (error) {
    console.log("Belum beruntung bang!");
  }

  return (
    <>
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
                onChange={(e) => setTodo({ ...todo, date: e.target.value })}
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
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
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
                  setTodo({ ...todo, description: e.target.value })
                }
              />
            </Form.Item>

            <Button className="btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>

      {
        <div>
          <>
            {loading || todos.length === 0 ? (
              <Card className="card">
                <span className="span-1">Loading sebentar ya bang ....</span>
                <pre className="span-2">{JSON.stringify(todo, null, "\t")}</pre>
              </Card>
            ) : (
              <Card className="card">
                <List
                  dataSource={todos}
                  renderItem={({ id, attributes }) => (
                    <List.Item
                      actions={[
                        <Button onClick={updateTodo.bind(this, id)} danger>
                          Update
                        </Button>,
                        <Button onClick={deleteTodo.bind(this, id)} danger>
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
                            <span className="span-2">
                              {attributes.description}
                            </span>
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
      }
    </>
  );
}
