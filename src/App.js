import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/style.css'
import AddTodo from "./Component/AddTodo";
import Menubar from "./Component/Menubar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import TodoList from "./Component/TodoList";
import Gallery from "./Component/Gallery";
import FileUpload from "./Component/FileUpload";
import News from "./Component/News";
import NotFound from "./Component/Error/NotFound";

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
        <Route path="/news" Component={News} />
        <Route path="*" element={<NotFound   />}/>
      </Routes>
    </Router>
  );
}

export default App;
