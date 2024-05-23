import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import "../css/todo.css";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../app/todo/todosSlice";
import { v4 as uuidv4 } from "uuid";
import ToastMesage from "./ToastMesage";

export default function AddTodo(props) {
  const dispatch = useDispatch();
  const [todoDetail, setTodoDetail] = useState({
    id: "",
    title: "",
    dueDate: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
    setValidated(false);
  };

  // Save Todo data in state & set unique id
  const saveTodoList = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else if (!isEdit) {
      const updatedTodo = {
        ...todoDetail,
        id: uuidv4(), // Generate a unique ID
      };
      dispatch(addTodo(updatedTodo)); // call addTodo
      setShowToast(true); // Show success toast message
      clearData(); // clear form
    } else {
      dispatch(updateTodo(todoDetail));
      setShowToast(true); // Show success toast message
      clearData(); // clear form
      props.onclose();
    }
  };

  useEffect(() => {
    if (props && props.isEdit) {
      setTodoDetail(props.item);
      setIsEdit(true);
    }
  }, []);
  return (
    <div className="container add-todo">
      <Form noValidate validated={validated} onSubmit={saveTodoList}>
        {!isEdit && <p className="heanding"> ADD TODO</p>}
        <Row className="md-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={todoDetail.title}
              onChange={handleFormData}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please add title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Due date"
              value={todoDetail.dueDate}
              onChange={handleFormData}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select due date
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3 my-2" controlId="description">
          <Form.Control
            as="textarea"
            placeholder="Add your todo description here..."
            style={{ height: "100px" }}
            value={todoDetail.description}
            onChange={handleFormData}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add description
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="footer">
          <Button variant="primary" type="submit" className="saveBtn">
            {!isEdit ? "Save" : "Update"}
          </Button>
          <Button type="button" className="clearBtn" onClick={clearData}>
            Clear
          </Button>
        </Form.Group>
      </Form>
      {showToast && (
        <ToastMesage
          isShow={showToast}
          message={`Todo ${isEdit ? "Update" : "Add"} successfully`}
          onclose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
