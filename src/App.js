import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./Component/AddTodo";
import Menubar from "./Component/Menubar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import TodoList from "./Component/TodoList";

function App() {
  return (
    <Router>
      <Menubar />
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/add-todo" Component={AddTodo} />
        <Route path="/todo-list" Component={TodoList} />
      </Routes>
    </Router>
  );
}

export default App;
