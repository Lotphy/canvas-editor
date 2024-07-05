import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { sampleImagesUrls, svgPathData } from '../shared/sample-resources';
import { SketchPicker } from 'react-color';

const ImageAttributes = ({ element, updateAttributes }) => {
  const [mask, setMask] = useState(null);
  const [maskSelector, setMaskSelector] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [imageSelector, setImageSelector] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [outlineSelector, setOutlineSelector] = useState(false);
  const [outlineColor, setOutlineColor] = useState('transparent');

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setMask(element.attrs.mask || '');
      setImageSource(element.attrs.src || '');
      setStrokeWidth(element.attrs.strokeWidth || 0);
      setOutlineColor(element.attrs.stroke || 'transparent');
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
          const maskPath = maskData.path2D;
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
          updateAttributes({
            src: imageData.url,
            originalHeight: imageData.originalHeight,
            originalWidth: imageData.originalWidth,
          })
        }}>
          <img src={imageData.url} alt="sample-image" className={`image-${index} mw-100`} />
        </MDBCol>
      )
    })
    return renderer;
  }

  const closeAllMenus = () => {
    setOutlineSelector(false);
    setImageSelector(false);
    setMaskSelector(false);
  }

  return (
    <div className="d-flex px-3">
      <div className="d-flex position-relative">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-2 me-3"
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
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-2 me-3"
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
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
        <label className="me-2">Outline:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={strokeWidth}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setStrokeWidth(value);
            updateAttributes({
              strokeWidth: value
            });
          }}
        />
      </div>
      <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3"
              noRipple
              onClick={() => {
                closeAllMenus();
                setOutlineSelector(!outlineSelector);
              }}>
        <div className="color-selector transparent-canvas outline" style={{ borderColor: element?.attrs?.stroke }}>
          <div className="outline-inner" />
        </div>
      </MDBBtn>
      {
        outlineSelector &&
        <div className="color-picker-wrapper">
          <SketchPicker
            color={outlineColor}
            onChange={(e) => {
              const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
              setOutlineColor(color);
              updateAttributes({
                stroke: color
              });
              if (strokeWidth === 0) {
                setStrokeWidth(8);
                updateAttributes({
                  strokeWidth: 8
                })
              }
            }}
          />
        </div>
      }
    </div>
  )
}

export default ImageAttributes;
