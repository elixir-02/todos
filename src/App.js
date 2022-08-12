import "./App.css";
import { Navbar } from "./components/Navbar";
import { Todo } from "./components/Todo";

function App() {
  return (
    <>
      <Navbar title="TooDoos" />
      <Todo />
    </>
  );
}

export default App;
