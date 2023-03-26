import { Button, Card, Form, Input, List } from "antd";
import { Content } from "antd/es/layout/layout";

import api from "axios";
import { useEffect, useState } from "react";

export default function TodoForm() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const url = "http://localhost:1337/api/new-todos";

  useEffect(() => {
    update();
  }, []);

  // read or update
  const update = async () => {
    await api(url)
      .then(({ data }) => setTodos(data.data))
      .catch((error) => {
        setError(error);
      });
  };

  // create todo
  const createTodo = async () => {
    await api
      .post(url, { data: todo })
      .then(() => {
        setTodo("");
        update();
      })
      .catch((error) => {
        setError(error);
      });
  };

  // update todo
  const updateTodo = async (id) => {
    api
      .put(`${url}/${id}`, { data: todo })
      .then(() => {
        setLoading(false);
        update();
      })
      .catch((error) => {
        setError(error);
      });
  };

  // delete todo
  const deleteTodo = async (id) => {
    api
      .delete(`${url}/${id}`, { data: todo })
      .then(() => {
        update();
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    console.log("Laper bang");
  }

  return (
    <>
      <Card className="card">
        <div>
          <h1 style={{ textAlign: "center", paddingBottom: 20 }}>
            <i>Todo List App</i>
          </h1>
        </div>

        <Form onFinish={createTodo}>
          <Form.Item
            label="Item"
            name="item"
            rules={[{ required: true, message: "Jangan lupa saur bang" }]}
          >
            <Input
              type="text"
              placeholder="Masukkan item anda"
              value={todo.item}
              onChange={(e) => {
                setTodo({ ...todo, item: e.currentTarget.value });
              }}
            />
          </Form.Item>

          <Button className="btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>

      <List
        dataSource={todos}
        renderItem={({ id, attributes }) => (
          <Card className="card">
            {!loading ? (
              <List.Item
                actions={[
                  <Button
                    className="btn"
                    onClick={() => {
                      setLoading(!loading);

                      setTodo(id);
                    }}
                  >
                    Update
                  </Button>,

                  <Button
                    className="btn"
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
                      <span className="span-1">ID : </span>
                      <span className="span-2">{id}</span>
                    </li>
                    <li>
                      <span className="span-1">Item : </span>
                      <span className="span-2">{attributes.item}</span>
                    </li>
                  </ul>
                </Content>
              </List.Item>
            ) : (
              <List.Item>
                <Content>
                  <Form onFinish={updateTodo.bind(this, id)}>
                    <Form.Item label="Item" name="item" required>
                      <Input
                        defaultValue={attributes.item}
                        value={todo.item}
                        onChange={(e) =>
                          setTodo({ ...todo, item: e.currentTarget.value })
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
          </Card>
        )}
      />
    </>
  );
}
