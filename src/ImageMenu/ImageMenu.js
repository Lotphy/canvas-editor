import React, { useState, useRef, useEffect, useContext } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './ImageMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUploadedImages, storeUploadedImage } from '../shared/store/stage.reducer';
import EditorContext from '../shared/EditorContext';
import { sampleImagesUrls } from '../shared/sample-resources';

const ImageMenu = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const storedImages = useSelector(getUploadedImages);
  const dispatch = useDispatch();
  const editorContext = useContext(EditorContext);

  useEffect(() => {
    const sampleFiles = sampleImagesUrls.map(imageData => imageData.url);
    setUploadedImages([...storedImages.map(img => img.data), ...sampleFiles]);
  }, []);

  const handleAddElement = (imageSrc) => {
    const id = crypto.randomUUID();
    const image = new Image();
    image.src = imageSrc.includes('data:image') ? imageSrc : require(`./${imageSrc}`);
    const displayHeight = 200;
    const ratio = displayHeight / image.height;
    const displayWidth = image.width * ratio;
	  const mask = null;
    const newElement = {
      id,
      type: 'image',
      src: imageSrc,
	    mask,
      x: 75,
      y: 50,
	    originalWidth: image.width,
	    originalHeight: image.height,
      scaleX: 1,
      scaleY: 1,
      width: displayWidth,
      height: displayHeight,
      relativeX: 75,
      relativeY: 50,
      stroke: '#000'
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
    uploadedImages.forEach((imageSrc, index) => {
      const imageData = imageSrc.includes('data:image') ? imageSrc : require(`./${imageSrc}`);
      renderer.push(
        <MDBCol className={`col-6 mb-3`} key={index} onClick={() => handleAddElement(imageSrc)}>
          <img src={imageData} alt="Sample" className={`sample-${index} mw-100`} />
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
