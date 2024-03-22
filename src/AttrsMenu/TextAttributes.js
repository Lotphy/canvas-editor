import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { SketchPicker } from 'react-color';

const TextAttributes = ({ element, updateAttribute }) => {
  const [fontSize, setFontSize] = useState(0);
  const [fontFamily, setFontFamily] = useState('');
  const [textAlign, setTextAlign] = useState('left');
  const [fontStyle, setFontStyle] = useState([]);
  const [textColor, setTextColor] = useState('black');
  const [strokeSize, setStrokeSize] = useState(0);
  const [strokeColor, setStrokeColor] = useState('black');
  const [displayTextColor, setDisplayTextColor] = useState(false);
  const [displayStrokeColor, setDisplayStrokeColor] = useState(false);

  useEffect(() => {
    if (element) {
      // Update input values whenever element attributes change
      setFontSize(element.attrs.fontSize || 0);
      setFontFamily(element.attrs.fontFamily || 'Arial');
      setTextAlign(element.attrs.align || 'left');
      setFontStyle(element.attrs.fontStyle?.split(' ') || []);
      setTextColor(element.attrs.fill || 'black');
      setStrokeSize(element.attrs.strokeWidth || 0);
      setStrokeColor(element.attrs.stroke || 'black');
    }
  }, [element]);

  const updateTextAlign = (align) => {
    setTextAlign(align);
    updateAttribute('align', align);
  }

  const updateFontStyle = (style) => {
    const styleIndex = fontStyle.indexOf(style);
    let newStyles = [];

    if (styleIndex >= 0) {
      // remove it
      newStyles = fontStyle.filter(e => e !== style);
    } else {
      newStyles = [...fontStyle, style];
    }
    setFontStyle(newStyles);
    updateAttribute('fontStyle', newStyles.join(' '));
  }

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
          <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
          <option value="Roboto" style={{ fontFamily: 'Roboto' }}>Roboto</option>
          <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
        </select>
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Size:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={fontSize}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setFontSize(value);
            updateAttribute('fontSize', value);
          }}
        />
      </div>
      <div className="d-flex">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3"
                onClick={() => setDisplayTextColor(!displayTextColor)}>
          <label className="me-2">Color:</label>
          <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{ color: element?.attrs?.fill }}/>
        </MDBBtn>
        {
          displayTextColor &&
          <div className="color-picker-wrapper">
            <SketchPicker
              color={textColor}
              onChange={(e) => {
                const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
                setTextColor(color);
                updateAttribute('fill', color);
              }}
            />
          </div>
        }
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
        <label className="me-2">Stroke:</label>
        <MDBInput
          className="text-white"
          type="number"
          value={strokeSize}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setStrokeSize(value);
            updateAttribute('strokeWidth', value);
          }}
        />
      </div>
      <div className="d-flex">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3"
                onClick={() => setDisplayStrokeColor(!displayStrokeColor)}>
          <label className="me-2">Outline:</label>
          <MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{ color: element?.attrs?.stroke }}/>
        </MDBBtn>
        {
          displayStrokeColor &&
          <div className="color-picker-wrapper">
            <SketchPicker
              color={strokeColor}
              onChange={(e) => {
                const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
                setStrokeColor(color);
                updateAttribute('stroke', color);
              }}
            />
          </div>
        }
      </div>
      <div className="d-flex p-2 switch-group">
        <MDBBtn className={`shadow-0 ${textAlign === 'left' && 'active'}`} onClick={() => updateTextAlign('left')}>
          <MDBIcon fas icon="align-left" size="lg" className="d-inline-block"/>
        </MDBBtn>
        <MDBBtn className={`shadow-0 ${textAlign === 'center' && 'active'}`} onClick={() => updateTextAlign('center')}>
          <MDBIcon fas icon="align-center" size="lg" className="d-inline-block"/>
        </MDBBtn>
        <MDBBtn className={`shadow-0 ${textAlign === 'right' && 'active'}`} onClick={() => updateTextAlign('right')}>
          <MDBIcon fas icon="align-right" size="lg" className="d-inline-block"/>
        </MDBBtn>
      </div>

      <div className="d-flex p-2 switch-group">
        <MDBBtn className={`shadow-0 ${fontStyle.includes('bold') && 'active'}`}
                onClick={() => updateFontStyle('bold')}>
          <MDBIcon fas icon="bold" size="lg" className="d-inline-block"/>
        </MDBBtn>
        <MDBBtn className={`shadow-0 ${fontStyle.includes('italic') && 'active'}`}
                onClick={() => updateFontStyle('italic')}>
          <MDBIcon fas icon="italic" size="lg" className="d-inline-block"/>
        </MDBBtn>
      </div>
    </>
  )
}


export default TextAttributes;
