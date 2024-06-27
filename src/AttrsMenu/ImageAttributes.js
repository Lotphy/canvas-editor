import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import {svgPathData} from "../shared/svg-masks";

const ImageAttributes = ({ element, updateAttribute }) => {
  const [mask, setMask] = useState(null);
  const [displayMaskSelector, setDisplayMaskSelector] = useState(true);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setMask(element.attrs.mask || '');
      setImageSource(element.attrs.src || '');
    }
  }, [element]);

  const renderMasks = () => {
    const renderer = [
	    <MDBCol className={`col-4 mb-3 d-flex align-items-center`} onClick={() => {
		    setMask(null);
		    updateAttribute('mask', null);
	    }}>
				    <span>None</span>
	    </MDBCol>
    ];

	  svgPathData.forEach((maskData, index) => {
      renderer.push(
        <MDBCol className={`col-4 mb-3 d-flex align-items-center`} key={index} onClick={() => {
          const m = new Path2D(maskData.path2D);
          setMask(m);
          updateAttribute('mask', m);
        }}>
            <img src={maskData.url} alt="mask" className={`mask-${index} mw-100`} />
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
                  setDisplayMaskSelector(!displayMaskSelector);
                }}>
          Mask
        </MDBBtn>
        {
          displayMaskSelector &&
          <div className="mask-selector-wrapper row">
            { renderMasks() }
          </div>
        }
      </div>
    </>
  )
}

export default ImageAttributes;
