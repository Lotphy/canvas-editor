import React, { useState, useRef } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './ImageMenu.css';
import Konva from 'konva';

const ImageMenu = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddElement = (imageBase64) => {
    const id = Konva.Util.getRandomColor(); // Use Konva's method to generate unique IDs
    const image = new Image();
    image.src = imageBase64;
    const newElement = {
      id,
      type: 'image',
      image: image.toString(),
      src: imageBase64,
      x: 75, // Adjust these values as needed
      y: 50,
      width: 200,
      height: 200,
      relativeX: 75,
      relativeY: 50
    };
    document.dispatchEvent(new CustomEvent('addElement', { detail: { elem: newElement } }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages([...uploadedImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const renderImages = () => {
    const renderer = [];
    uploadedImages.forEach((imageBase64, index) => {
      renderer.push(
        <MDBCol className="col-6 mb-3" key={index} onClick={() => handleAddElement(imageBase64)}>
          <img src={imageBase64} alt="Selected" className="mw-100"/>
        </MDBCol>
      )
    })
    return renderer;
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <MDBRow className="image-menu d-flex m-0">
        {renderImages()}
        <MDBCol className="col-6">
          <MDBBtn onClick={handleUploadButtonClick} className="element-btn d-flex align-items-center w-100">
            <div className="d-flex flex-column w-100">
              <MDBIcon fas icon="file-upload"/>
              <span className="fs-5">Upload</span>
            </div>
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default ImageMenu;
