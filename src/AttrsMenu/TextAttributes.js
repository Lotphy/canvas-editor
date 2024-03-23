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
          <option value="Arial, sans-serif" style={{ fontFamily: 'Arial, sans-serif' }}>Arial</option>
          <option value="Arial Black, sans-serif" style={{ fontFamily: 'Arial Black, sans-serif' }}>Arial Black</option>
          <option value="Comic Sans MS, sans-serif" style={{ fontFamily: 'Comic Sans MS, sans-serif' }}>Comic Sans MS</option>
          <option value="Courier New, monospace" style={{ fontFamily: 'Courier New, monospace' }}>Courier New</option>
          <option value="Georgia, serif" style={{ fontFamily: 'Georgia, serif' }}>Georgia</option>
          <option value="Impact, sans-serif" style={{ fontFamily: 'Impact, sans-serif' }}>Impact</option>
          <option value="Lato, sans-serif" style={{ fontFamily: 'Lato, sans-serif' }}>Lato</option>
          <option value="Lucida Console, monospace" style={{ fontFamily: 'Lucida Console, monospace' }}>Lucida Console</option>
          <option value="Lucida Sans Unicode, sans-serif" style={{ fontFamily: 'Lucida Sans Unicode, sans-serif' }}>Lucida Sans Unicode</option>
          <option value="Palatino Linotype, serif" style={{ fontFamily: 'Palatino Linotype, serif' }}>Palatino Linotype</option>
          <option value="Tahoma, sans-serif" style={{ fontFamily: 'Tahoma, sans-serif' }}>Tahoma</option>
          <option value="Times New Roman, serif" style={{ fontFamily: 'Times New Roman, serif' }}>Times New Roman</option>
          <option value="Trebuchet MS, sans-serif" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>Trebuchet MS</option>
          <option value="Verdana, sans-serif" style={{ fontFamily: 'Verdana, sans-serif' }}>Verdana</option>
          <option value="Open Sans, sans-serif" style={{ fontFamily: 'Open Sans, sans-serif' }}>Open Sans</option>
          <option value="Roboto, sans-serif" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto</option>
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
