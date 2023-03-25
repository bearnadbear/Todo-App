import { Layout } from "antd";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoHeader from "./components/TodoHeader";

export default function App() {
  return (
    <Layout>
      <TodoHeader />

      <TodoForm />
    </Layout>
  );
}
