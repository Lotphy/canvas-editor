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
	  const mask = new Path2D("M 144.222656 62.425781 C 108.523438 40.707031 125.265625 10.054688 125.984375 8.777344 C 127.027344 6.964844 127.023438 4.734375 125.976562 2.925781 C 124.929688 1.113281 122.996094 0 120.90625 0 C 102.527344 0 88.136719 5.222656 78.132812 15.519531 C 61.042969 33.113281 61.835938 60.5 62.171875 72.195312 C 62.210938 73.488281 62.242188 74.609375 62.242188 75.441406 C 62.242188 84.125 63.636719 92.140625 64.863281 99.210938 C 65.65625 103.769531 66.339844 107.707031 66.464844 110.800781 C 66.59375 114.113281 65.988281 114.871094 65.960938 114.902344 C 65.875 115.003906 65.15625 115.386719 63.214844 115.386719 C 60.996094 115.386719 59.363281 114.664062 57.917969 113.039062 C 52.261719 106.699219 51.871094 89.386719 52.953125 79.964844 C 53.144531 78.304688 52.621094 76.640625 51.507812 75.394531 C 50.394531 74.144531 48.804688 73.429688 47.132812 73.429688 C 31.917969 73.429688 20.550781 98.308594 20.550781 120.550781 C 20.550781 131.007812 22.65625 141.25 26.804688 150.996094 C 30.8125 160.417969 36.53125 168.921875 43.800781 176.269531 C 58.9375 191.570312 78.894531 200 99.996094 200 C 121.1875 200 141.136719 191.691406 156.179688 176.605469 C 171.183594 161.558594 179.449219 141.652344 179.449219 120.550781 C 179.449219 93.628906 158.382812 71.042969 144.222656 62.425781 Z M 144.222656 62.425781 ");

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
