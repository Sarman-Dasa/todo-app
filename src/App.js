import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./Component/AddTodo";
import Menubar from "./Component/Menubar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import TodoList from "./Component/TodoList";
import Gallery from "./Component/Gallery";
import FileUpload from "./Component/FileUpload";

function App() {
  return (
    <Router>
      <Menubar />
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/add-todo" Component={AddTodo} />
        <Route path="/todo-list" Component={TodoList} />
        <Route path="/add-image" Component={FileUpload} />
        <Route path="/gallery" Component={Gallery} />
      </Routes>
    </Router>
  );
}

export default App;
