import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";

const TextAttributes = ({ element, updateAttribute }) => {
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  const [fontFamily, setFontFamily] = useState('');

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setStrokeWidth(element.attrs.strokeWidth || 0);
      setFontSize(element.attrs.fontSize || 0);
      setFontFamily(element.attrs.fontFamily || 0);
    }
  }, [element]);

  return (
    <>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Font:</label>
        <select
          value={fontFamily}
          onChange={(e) => {
            const value = e.target.value;
            setFontFamily(value);
            updateAttribute('fontFamily', value);
          }}>
          <option disabled value="">Pick one</option>
          <option value="Arial" style={{fontFamily: 'Arial'}}>Arial</option>
          <option value="Roboto" style={{fontFamily: 'Roboto'}}>Roboto</option>
          <option value="Verdana" style={{fontFamily: 'Verdana'}}>Verdana</option>
        </select>
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Size:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={fontSize}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setFontSize(value);
            updateAttribute('fontSize', value);
          }}
        />
      </div>
      <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Color:</label>
        <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{color: element?.attrs?.fill}}/>
      </MDBBtn>
      <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Outline:</label>
        <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{color: element?.attrs?.stroke}}/>
      </MDBBtn>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Outline width:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={strokeWidth}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setStrokeWidth(value);
            updateAttribute('strokeWidth', value);
          }}
        />
      </div>
    </>
  )
}


export default TextAttributes;
