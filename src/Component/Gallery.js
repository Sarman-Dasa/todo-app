import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    imageList();
  }, []);

  const imageList = () => {
    const imageKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("my-file")
    );

    // const imageData = imageKeys.map((key) => localStorage.getItem(key));
    // const parsedImageData = imageData.map((item) => JSON.parse(item)); // Parse each JSON string

    const parsedImageData = imageKeys.map((key) => {
      const item = localStorage.getItem(key);
      const image = JSON.parse(item);
      return { key, image };
    });

    setImages(parsedImageData);
  };

  // Show Confirmation message for image delete
  const deleteConfirmation = (id) => {
    MySwal.fire({
      title: "Do you want to delete this item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonClass: "",
      customClass: {
        confirmButton: "btn text-bg-danger",
        cancelButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        removeImage(id); // Yes to call removeImage function
      }
    });
  };

  const removeImage = (key) => {
    let index = images.findIndex((item) => item.key === key);
    images.splice(index, 1);
    localStorage.removeItem(key);
    imageList();
  };
  return (
    <Container>
      <Row>
        {images.map((file, index) => (
          <div key={index} className="col-md-4 my-2">
            <Card style={{ width: "18rem", height: "100%" }}>
              { }
              <Card.Img
                variant="bottom"
                src={file.image.url}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{file.image.name}</Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted">
                <button onClick={() => deleteConfirmation(file.key)}>
                  Delete
                </button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
}
