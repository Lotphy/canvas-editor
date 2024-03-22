import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { SketchPicker } from 'react-color';

const SquareAttributes = ({ element, updateAttribute }) => {
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [displayBackgroundPalette, setDisplayBackgroundPalette] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [displayOutlinePalette, setDisplayOutlinePalette] = useState(false);
  const [outlineColor, setOutlineColor] = useState('transparent');

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setStrokeWidth(element.attrs.strokeWidth || 0);
      setCornerRadius(element.attrs.cornerRadius || 0);
      setOutlineColor(element.attrs.stroke || 'transparent');
      setBackgroundColor(element.attrs.fill || 'transparent');
    }
  }, [element]);

  return (
    <>
      <div className="d-flex">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3"
                onClick={() => {
                  setDisplayBackgroundPalette(!displayBackgroundPalette);
                  setDisplayOutlinePalette(false);
                }}>
          <label className="me-2">Background:</label>
          <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{ color: element?.attrs?.fill }}/>
        </MDBBtn>
        {
          displayBackgroundPalette &&
          <div className="color-picker-wrapper">
            <SketchPicker
              color={backgroundColor}
              onChange={(e) => {
                const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
                setBackgroundColor(color);
                updateAttribute('fill', color);
              }}
            />
          </div>
        }
      </div>
      <div className="d-flex">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3"
                onClick={() => {
                  setDisplayOutlinePalette(!displayOutlinePalette);
                  setDisplayBackgroundPalette(false);
                }}>
          <label className="me-2">Outline:</label>
          <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{ color: element?.attrs?.stroke }}/>
        </MDBBtn>
        {
          displayOutlinePalette &&
          <div className="color-picker-wrapper">
            <SketchPicker
              color={outlineColor}
              onChange={(e) => {
                const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
                setOutlineColor(color);
                updateAttribute('stroke', color);
                if (strokeWidth === 0) {
                  setStrokeWidth(4);
                  updateAttribute('strokeWidth', 4);
                }
              }}
            />
          </div>
        }
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Outline width:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={strokeWidth}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setStrokeWidth(value);
            updateAttribute('strokeWidth', value);
          }}
        />
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Corner:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={cornerRadius}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setCornerRadius(value);
            updateAttribute('cornerRadius', value);
          }}
        />
      </div>
    </>
  )
}


export default SquareAttributes;
