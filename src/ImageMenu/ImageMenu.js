import React, { useState, useRef, useEffect } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './ImageMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUploadedImages, storeUploadedImage } from '../shared/store/stage.reducer';

const ImageMenu = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const storedImages = useSelector(getUploadedImages);
  const dispatch = useDispatch();

  useEffect(() => {
    setUploadedImages(storedImages.map(img => img.data));
  }, []);

  const handleAddElement = (imageBase64) => {
    const id = crypto.randomUUID();
    const image = new Image();
    image.src = imageBase64;
    const ratio = 200 / image.width;
    const displayWidth = 200;
    const displayHeight = image.height * ratio;
    const newElement = {
      id,
      type: 'image',
      image: image.toString(),
      src: imageBase64,
      x: 75, // Adjust these values as needed
      y: 50,
      width: displayWidth,
      height: displayHeight,
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
        dispatch(storeUploadedImage({
          id: crypto.randomUUID(),
          data: event.target.result
        }));
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
