import React, { useState, useRef, useEffect, useContext } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './ImageMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUploadedImages, storeUploadedImage } from '../shared/store/stage.reducer';
import { EditorContext } from '../shared/context';

const ImageMenu = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const storedImages = useSelector(getUploadedImages);
  const dispatch = useDispatch();
  const editorContext = useContext(EditorContext);

  useEffect(() => {
    const presetImages = [`${process.env.PUBLIC_URL}/assets/samples/img/1.jpg`, `${process.env.PUBLIC_URL}/assets/samples/img/2.jpg`];
    setUploadedImages([...storedImages.map(img => img.data), ...presetImages]);
  }, []);

  const handleAddElement = (imageBase64) => {
    const id = crypto.randomUUID();
    const image = new Image();
    image.src = imageBase64;
    const displayWidth = 200;
    const ratio = displayWidth / image.width;
    const displayHeight = image.height * ratio;
	  const mask = new Path2D("m40.4 21.5-.7-.7.7-.7c2.3-2.5 2.2-6.4-.3-8.7L30.1 2c-2.5-2.3-6.4-2.2-8.7.3l-.7.7-.7-.7c-2.5-2.3-6.4-2.2-8.7.3l-9.4 10c-2.3 2.5-2.2 6.4.3 8.7l.7.7-.7.7c-2.3 2.5-2.2 6.4.3 8.7l10 9.4c2.5 2.3 6.4 2.2 8.7-.3l.7-.7.7.7c2.5 2.3 6.4 2.2 8.7-.3l9.4-10c2.3-2.5 2.2-6.4-.3-8.7Z");

    const newElement = {
      id,
      type: 'image',
      src: imageBase64,
	    mask,
      x: 75, // Adjust these values as needed
      y: 50,
      width: displayWidth,
      height: displayHeight,
      relativeX: 75,
      relativeY: 50
    };
    editorContext.setElements(elems =>[...elems, newElement]);
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
        <MDBCol className={`col-6 mb-3`} key={index} onClick={() => handleAddElement(imageBase64)}>
          <img src={imageBase64} alt="Selected" className={`sample-${index} mw-100`} />
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
