import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';

const ImageAttributes = ({ element, updateAttribute }) => {
  const [mask, setMask] = useState(null);
  const [displayMaskSelector, setDisplayMaskSelector] = useState(true);
  const [imageSource, setImageSource] = useState('');

  const masksList = [
    {
      url: `${process.env.PUBLIC_URL}/assets/masks/1.svg`,
      value: null
    }, {
      url: `${process.env.PUBLIC_URL}/assets/masks/1.svg`,
      value: new Path2D("m40.4 21.5-.7-.7.7-.7c2.3-2.5 2.2-6.4-.3-8.7L30.1 2c-2.5-2.3-6.4-2.2-8.7.3l-.7.7-.7-.7c-2.5-2.3-6.4-2.2-8.7.3l-9.4 10c-2.3 2.5-2.2 6.4.3 8.7l.7.7-.7.7c-2.3 2.5-2.2 6.4.3 8.7l10 9.4c2.5 2.3 6.4 2.2 8.7-.3l.7-.7.7.7c2.5 2.3 6.4 2.2 8.7-.3l9.4-10c2.3-2.5 2.2-6.4-.3-8.7Z"),
    }, {
      url: `${process.env.PUBLIC_URL}/assets/masks/2.svg`,
      value: new Path2D("M 144.222656 62.425781 C 108.523438 40.707031 125.265625 10.054688 125.984375 8.777344 C 127.027344 6.964844 127.023438 4.734375 125.976562 2.925781 C 124.929688 1.113281 122.996094 0 120.90625 0 C 102.527344 0 88.136719 5.222656 78.132812 15.519531 C 61.042969 33.113281 61.835938 60.5 62.171875 72.195312 C 62.210938 73.488281 62.242188 74.609375 62.242188 75.441406 C 62.242188 84.125 63.636719 92.140625 64.863281 99.210938 C 65.65625 103.769531 66.339844 107.707031 66.464844 110.800781 C 66.59375 114.113281 65.988281 114.871094 65.960938 114.902344 C 65.875 115.003906 65.15625 115.386719 63.214844 115.386719 C 60.996094 115.386719 59.363281 114.664062 57.917969 113.039062 C 52.261719 106.699219 51.871094 89.386719 52.953125 79.964844 C 53.144531 78.304688 52.621094 76.640625 51.507812 75.394531 C 50.394531 74.144531 48.804688 73.429688 47.132812 73.429688 C 31.917969 73.429688 20.550781 98.308594 20.550781 120.550781 C 20.550781 131.007812 22.65625 141.25 26.804688 150.996094 C 30.8125 160.417969 36.53125 168.921875 43.800781 176.269531 C 58.9375 191.570312 78.894531 200 99.996094 200 C 121.1875 200 141.136719 191.691406 156.179688 176.605469 C 171.183594 161.558594 179.449219 141.652344 179.449219 120.550781 C 179.449219 93.628906 158.382812 71.042969 144.222656 62.425781 Z M 144.222656 62.425781 "),
    }
  ];

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setMask(element.attrs.mask || '');
      setImageSource(element.attrs.src || '');
    }
  }, [element]);

  const renderMasks = () => {
    const renderer = [];
    masksList.forEach((maskData, index) => {
      renderer.push(
        <MDBCol className={`col-4 mb-3`} key={index} onClick={() => {
          const m = maskData.value;
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
