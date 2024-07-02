import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { sampleImagesUrls, svgPathData } from '../shared/sample-resources';

const ImageAttributes = ({ element, updateAttributes }) => {
  const [mask, setMask] = useState(null);
  const [maskSelector, setMaskSelector] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [imageSelector, setImageSelector] = useState(false);

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setMask(element.attrs.mask || '');
      setImageSource(element.attrs.src || '');
    }
  }, [element]);

  const renderMasks = () => {
    const renderer = [
	    <MDBCol className={`col-4 mb-3 d-flex align-items-center`} key={null} onClick={() => {
		    setMask(null);
		    updateAttributes({
          mask: null
        });
	    }}>
				    <span>None</span>
	    </MDBCol>
    ];

	  svgPathData.forEach((maskData, index) => {
      renderer.push(
        <MDBCol className={`col-4 mb-3 d-flex align-items-center`} key={index} onClick={() => {
          const maskPath = new Path2D(maskData.path2D);
          setMask(maskPath);
          updateAttributes({
            mask: maskPath
          });
        }}>
          <img src={maskData.url} alt="mask" className={`mask-${index} mw-100`} />
        </MDBCol>
      )
    })
    return renderer;
  }

  const renderImageSelector = () => {
    const renderer = [];

	  sampleImagesUrls.forEach((imageData, index) => {
      renderer.push(
        <MDBCol className={`col-6 mb-3 d-flex align-items-center`} key={index} onClick={() => {
          setImageSource(imageData.url);
          const displayHeight = 200;
          const ratio = displayHeight / imageData.height;
          const displayWidth = imageData.width * ratio;
          updateAttributes({
            src: imageData.url,
            originalHeight: imageData.originalHeight,
            originalWidth: imageData.originalWidth,
            width: displayWidth,
            height: displayHeight
          })
          console.log(element)
        }}>
          <img src={imageData.url} alt="sample-image" className={`image-${index} mw-100`} />
        </MDBCol>
      )
    })
    return renderer;
  }

  return (
    <>
      <div className="d-flex position-relative">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 mx-3"
                noRipple
                onClick={() => {
                  setMaskSelector(false);
                  setImageSelector(!imageSelector);
                }}>
          Image
        </MDBBtn>
        {
          imageSelector &&
          <div className="mask-selector-wrapper row">
            { renderImageSelector() }
          </div>
        }
      </div>
      <div className="d-flex position-relative">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 mx-3"
                noRipple
                onClick={() => {
                  setMaskSelector(!maskSelector);
                  setImageSelector(false);
                }}>
          Mask
        </MDBBtn>
        {
          maskSelector &&
          <div className="mask-selector-wrapper row">
            { renderMasks() }
          </div>
        }
      </div>
    </>
  )
}

export default ImageAttributes;
