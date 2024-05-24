import React, { useEffect, useState } from "react";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";
import PropTypes from 'prop-types'

export default function ToastMesage(props) {
  const [showA, setShowA] = useState(props.isShow);
  const closeToast = () => {
    setShowA(!showA);
    props.onclose();
  };

  useEffect(() => {
    setShowA(props.isShow);
  }, [props.isShow]);
  return (
    <div>
      <Row>
        <Col md={6} className="mb-2">
          <ToastContainer
            className="p-3"
            position="top-end"
            style={{ zIndex: 1 }}
          >
            <Toast bg={props.variant} show={showA} onClose={closeToast}>
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body className="text-light">{props.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </div>
  );
}


// ToastMesage.prototype = {
//   variant: PropTypes.string.isRequired
// }
// Set Defualt value to variant props 
ToastMesage.defaultProps = {
  variant:'success',
}

