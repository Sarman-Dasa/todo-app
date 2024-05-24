import React, { useRef, useState } from "react";
import { Card, Container, Form, Row } from "react-bootstrap";
import "../css/fileUpload.css";
import uploadImage from "../images/file-upload.png";
import ToastMesage from "./ToastMesage";
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB limit

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileRef = useRef();
  const uploadFile = () => {
    fileRef.current.click();
  };
  //   const handleFileChange = (e) => {
  //     const files = e.target.files;
  //     if (files && files.length > 0) {
  //       const newFiles = Array.from(files).filter(
  //         (file) => file.size <= MAX_FILE_SIZE_BYTES
  //       );
  //       setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  //     }
  //   };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).filter((file) => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          setToastMessage(`File "${file.name}" exceeds the maximum file size.`);
          setShowToast(true);
          return false;
        }
        return true;
      });
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleSaveButtonClick = () => {
    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const fileName = file.name;
        const files = JSON.stringify({
          url: fileData,
          name: fileName,
        });
        localStorage.setItem(`my-file-${index}-${fileName}`, files);
      };
      reader.readAsDataURL(file);
    });

    setToastMessage('Image(s) Uploaded successfully');
    setShowToast(true)
    // setTimeout(() => {
    //   setSelectedFiles([]);
    // }, 200);
  };

  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Add Images</Card.Title>
          <Form.Control
            type="file"
            multiple
            className="file-input"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileRef}
          />
          <div className="file-upload" onClick={uploadFile}>
            <img src={uploadImage} alt="not found" />
            <p>Browse file to upload </p>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <button onClick={handleSaveButtonClick}>Save</button>
        </Card.Footer>
      </Card>
      <Row>
        {selectedFiles.map((file, index) => (
          <div key={index} className="col-md-3 my-2">
            <Card style={{ width: "18rem", height: "100%" }}>
              {file.id}
              <Card.Img
                variant="bottom"
                src={URL.createObjectURL(file)}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>{file.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
      {showToast && (
        <ToastMesage
          isShow={showToast}
          message={toastMessage}
          onclose={() => setShowToast(false)}
          variant="danger"
        />
      )}
    </Container>
  );
};

export default FileUpload;
