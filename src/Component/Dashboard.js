import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Todo List</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Add Your Todo list
          </Card.Subtitle>
          <Card.Text>sdasd</Card.Text>
          <Link className="card-link" to="/add-todo">
            Add Todo
          </Link>
          <Link className="card-link" to="/todo-list">
            List
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
