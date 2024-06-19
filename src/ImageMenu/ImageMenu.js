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
    const presetImages = [
      `${process.env.PUBLIC_URL}/assets/samples/img/1.jpg`,
      `${process.env.PUBLIC_URL}/assets/samples/img/2.jpg`,
      `${process.env.PUBLIC_URL}/assets/samples/img/3.jpg`
    ];
    setUploadedImages([...storedImages.map(img => img.data), ...presetImages]);
  }, []);

  const handleAddElement = (imageBase64) => {
    const id = crypto.randomUUID();
    const image = new Image();
    image.src = imageBase64;
    const displayWidth = 200;
    const ratio = displayWidth / image.width;
    const displayHeight = image.height * ratio;
	  const mask = new Path2D("M 50.714844 0 L 0.714844 0 L 0.714844 50 C 0.714844 75.460938 19.746094 96.480469 44.359375 99.601562 C 19.402344 102.402344 0 123.578125 0 149.285156 L 0 199.285156 L 50 199.285156 C 75.460938 199.285156 96.480469 180.253906 99.601562 155.640625 C 102.402344 180.597656 123.578125 200 149.285156 200 L 199.285156 200 L 199.285156 150 C 199.285156 124.539062 180.253906 103.519531 155.640625 100.398438 C 180.597656 97.597656 200 76.421875 200 50.714844 L 200 0.714844 L 150 0.714844 C 124.539062 0.714844 103.519531 19.746094 100.398438 44.359375 C 97.597656 19.402344 76.421875 0 50.714844 0 Z M 50.714844 0 ");

    const newElement = {
      id,
      type: 'image',
      src: imageBase64,
	    mask,
      x: 75, // Adjust these values as needed
      y: 50,
      width: 200,
      height: 200,
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
