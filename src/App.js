import { Layout } from "antd";
import "./App.css";
import TodoForm from "./components/Todo-Form";
import TodoHeader from "./components/Todo-Header";

export default function App() {
  return (
    <Layout>
      <TodoHeader />

      <TodoForm />
    </Layout>
  );
}
