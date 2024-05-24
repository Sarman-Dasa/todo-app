import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Applogo from "../images/todo.png";
import { Link } from "react-router-dom";

function Menubar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
      <Container>
        <Link to="/" className="navbar-brand">
          <img
            src={Applogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="R"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="add-todo" className="nav-link">
              Add Todo
            </Link>
            <Link to="todo-list" className="nav-link">
              Todo List
            </Link>
            <Link to="add-image" className="nav-link">
              Add Images
            </Link>
            <Link to="gallery" className="nav-link">
              Gallery
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;
