import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("my-file")
    );

    const imageData = imageKeys.map((key) => localStorage.getItem(key));
    const parsedImageData = imageData.map((item) => JSON.parse(item)); // Parse each JSON string
    setImages(parsedImageData);
  }, []);

  return (
    <Container>
      <Row>
        {images.map((file, index) => (
          <div key={index} className="col-md-4 my-2">
            <Card style={{ width: "18rem", height: "100%" }}>
              <Card.Img
                variant="bottom"
                src={file.url}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{file.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
}
