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
    // }, {
    //   url: `${process.env.PUBLIC_URL}/assets/masks/1.svg`,
    //   value: new Path2D("m40.4 21.5-.7-.7.7-.7c2.3-2.5 2.2-6.4-.3-8.7L30.1 2c-2.5-2.3-6.4-2.2-8.7.3l-.7.7-.7-.7c-2.5-2.3-6.4-2.2-8.7.3l-9.4 10c-2.3 2.5-2.2 6.4.3 8.7l.7.7-.7.7c-2.3 2.5-2.2 6.4.3 8.7l10 9.4c2.5 2.3 6.4 2.2 8.7-.3l.7-.7.7.7c2.5 2.3 6.4 2.2 8.7-.3l9.4-10c2.3-2.5 2.2-6.4-.3-8.7Z"),
    }, {
      url: `${process.env.PUBLIC_URL}/assets/masks/2.svg`,
      value: new Path2D("M 144.222656 62.425781 C 108.523438 40.707031 125.265625 10.054688 125.984375 8.777344 C 127.027344 6.964844 127.023438 4.734375 125.976562 2.925781 C 124.929688 1.113281 122.996094 0 120.90625 0 C 102.527344 0 88.136719 5.222656 78.132812 15.519531 C 61.042969 33.113281 61.835938 60.5 62.171875 72.195312 C 62.210938 73.488281 62.242188 74.609375 62.242188 75.441406 C 62.242188 84.125 63.636719 92.140625 64.863281 99.210938 C 65.65625 103.769531 66.339844 107.707031 66.464844 110.800781 C 66.59375 114.113281 65.988281 114.871094 65.960938 114.902344 C 65.875 115.003906 65.15625 115.386719 63.214844 115.386719 C 60.996094 115.386719 59.363281 114.664062 57.917969 113.039062 C 52.261719 106.699219 51.871094 89.386719 52.953125 79.964844 C 53.144531 78.304688 52.621094 76.640625 51.507812 75.394531 C 50.394531 74.144531 48.804688 73.429688 47.132812 73.429688 C 31.917969 73.429688 20.550781 98.308594 20.550781 120.550781 C 20.550781 131.007812 22.65625 141.25 26.804688 150.996094 C 30.8125 160.417969 36.53125 168.921875 43.800781 176.269531 C 58.9375 191.570312 78.894531 200 99.996094 200 C 121.1875 200 141.136719 191.691406 156.179688 176.605469 C 171.183594 161.558594 179.449219 141.652344 179.449219 120.550781 C 179.449219 93.628906 158.382812 71.042969 144.222656 62.425781 Z M 144.222656 62.425781 "),
    }, {
      url: `${process.env.PUBLIC_URL}/assets/masks/3.svg`,
      value: new Path2D("M 50.714844 0 L 0.714844 0 L 0.714844 50 C 0.714844 75.460938 19.746094 96.480469 44.359375 99.601562 C 19.402344 102.402344 0 123.578125 0 149.285156 L 0 199.285156 L 50 199.285156 C 75.460938 199.285156 96.480469 180.253906 99.601562 155.640625 C 102.402344 180.597656 123.578125 200 149.285156 200 L 199.285156 200 L 199.285156 150 C 199.285156 124.539062 180.253906 103.519531 155.640625 100.398438 C 180.597656 97.597656 200 76.421875 200 50.714844 L 200 0.714844 L 150 0.714844 C 124.539062 0.714844 103.519531 19.746094 100.398438 44.359375 C 97.597656 19.402344 76.421875 0 50.714844 0 Z M 50.714844 0 "),
    }, {
      url: `${process.env.PUBLIC_URL}/assets/masks/4.svg`,
      value: new Path2D("M 165.964844 134.035156 C 160.496094 139.503906 151.632812 139.503906 146.164062 134.035156 L 122.027344 109.898438 C 116.558594 104.433594 116.558594 95.566406 122.027344 90.101562 L 146.164062 65.964844 C 151.632812 60.496094 160.496094 60.496094 165.964844 65.964844 L 190.101562 90.101562 C 195.566406 95.566406 195.566406 104.433594 190.101562 109.898438 Z M 53.835938 134.035156 C 48.367188 139.503906 39.503906 139.503906 34.035156 134.035156 L 9.898438 109.898438 C 4.433594 104.433594 4.433594 95.566406 9.898438 90.101562 L 34.035156 65.964844 C 39.503906 60.496094 48.367188 60.496094 53.835938 65.964844 L 77.972656 90.101562 C 83.441406 95.566406 83.441406 104.433594 77.972656 109.898438 Z M 109.898438 190.101562 C 104.433594 195.566406 95.566406 195.566406 90.101562 190.101562 L 65.964844 165.964844 C 60.496094 160.496094 60.496094 151.632812 65.964844 146.164062 L 90.101562 122.027344 C 95.566406 116.558594 104.433594 116.558594 109.898438 122.027344 L 134.035156 146.164062 C 139.503906 151.632812 139.503906 160.496094 134.035156 165.964844 Z M 109.898438 77.972656 C 104.433594 83.441406 95.566406 83.441406 90.101562 77.972656 L 65.964844 53.835938 C 60.496094 48.367188 60.496094 39.503906 65.964844 34.035156 L 90.101562 9.898438 C 95.566406 4.433594 104.433594 4.433594 109.898438 9.898438 L 134.035156 34.039062 C 139.503906 39.503906 139.503906 48.367188 134.035156 53.835938 Z M 109.898438 77.972656 "),
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
        <MDBCol className={`col-4 mb-3 d-flex align-items-center`} key={index} onClick={() => {
          const m = maskData.value;
          setMask(m);
          updateAttribute('mask', m);
        }}>
          {
            index === 0 ?
              <span>None</span> : <img src={maskData.url} alt="mask" className={`mask-${index} mw-100`} />
          }

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
