import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function Dashboard() {
  const todoList = useSelector((state) => state.todos.todos);
  const [todoCount, setTodoCount] = useState({ high: 0, medium: 0, low: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // when component mount to call getPriorityWiseCount() funcation
    getPriorityWiseCount();
  }, []);

  // Get priority wise count from todo list
  function getPriorityWiseCount() {
    const todoPriorityCount = todoList.reduce((count, todo) => {
      const { priority } = todo;
      count[priority] = (count[priority] || 0) + 1;
      return count;
    }, {});

    setTodoCount(todoPriorityCount);
  }

  const redirectTodoList = (key) => {
    navigate(
      `/todo-list?${createSearchParams({
        priority: key,
      })}`
    );
  };

  return (
    <div className="container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Todo List</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Add Your Todo list
          </Card.Subtitle>
          <Card.Text>
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">High</Tooltip>}
            >
              <button onClick={() => redirectTodoList("high")}>
                {todoCount.high}
              </button>
            </OverlayTrigger>

            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Medium</Tooltip>}
            >
              <button
                onClick={() => redirectTodoList("medium")}
                style={{ margin: "0px 5px", backgroundColor: "ButtonText" }}
              >
                {todoCount.medium}
              </button>
            </OverlayTrigger>

            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">Low</Tooltip>}
            >
              <button
                onClick={() => redirectTodoList("low")}
                style={{ backgroundColor: "Highlight" }}
              >
                {todoCount.low}
              </button>
            </OverlayTrigger>
          </Card.Text>
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
