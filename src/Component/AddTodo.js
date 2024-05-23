import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import "../css/todo.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todo/todosSlice";
import { v4 as uuidv4 } from "uuid";
import ToastMesage from "./ToastMesage";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [todoDetail, setTodoDetail] = useState({
    id: "",
    title: "",
    dueDate: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);

  // Set form data into variable as key value pair
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setTodoDetail((preview) => ({
      ...preview,
      [id]: value,
    }));
  };

  //Clear Form data
  const clearData = () => {
    setTodoDetail({
      id: "",
      title: "",
      dueDate: "",
      description: "",
    });
  };

  // Save Todo data in state & set unique id
  const saveTodoList = (e) => {
    const updatedTodo = {
      ...todoDetail,
      id: uuidv4(), // Generate a unique ID
    };
    dispatch(addTodo(updatedTodo)); // call addTodo
    setShowToast(true); // Show success toast message
    clearData(); // clear form
  };

  return (
    <div className="container add-todo">
      <Form>
        <p className="heanding"> ADD TODO</p>
        <Row className="md-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={todoDetail.title}
              onChange={handleFormData}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Due date"
              value={todoDetail.dueDate}
              onChange={handleFormData}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3 my-2" controlId="description">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={todoDetail.description}
            onChange={handleFormData}
          />
        </Form.Group>
        <Form.Group className="footer">
          <Button
            variant="primary"
            type="button"
            className="saveBtn"
            onClick={saveTodoList}
          >
            Submit
          </Button>
          <Button type="button" className="clearBtn" onClick={clearData}>
            Clear
          </Button>
        </Form.Group>
      </Form>
      {showToast && (
        <ToastMesage
          isShow={showToast}
          message="Todo Add successfully"
          onclose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
