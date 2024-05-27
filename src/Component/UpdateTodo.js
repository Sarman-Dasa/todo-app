import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddTodo from "./AddTodo";

function UpdatedTodo(props) {
  const [show, setShow] = useState(props.isShow);
  console.log(props.isShow);
  const handleClose = () => {
    setShow(false);
    props.onclose();
  };

  useEffect(() => {
    setShow(true);
  }, [props.isShow]);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodo isEdit={true} item={props.item} onclose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatedTodo;
