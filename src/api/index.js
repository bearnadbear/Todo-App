// import axios from "axios";

export const url = "http://localhost:1337/api/todos";

// export const readTodos = () => axios.get(url);
// export const createTodo = (newTodo) => axios.post(url, newTodo);
// export const updateTodos = (id, updateTodo) =>
//   axios.put(`${url}/${id}`, updateTodo);
// export const deleteTodos = (id) => axios.delete(`${url}/${id}`);

{
  /* <>
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
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
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
                        <span className="span-2">{attributes.description}</span>
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
</>; */
}
