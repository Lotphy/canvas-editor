import React, { useContext, useState } from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { SketchPicker } from 'react-color';
import EditorContext from '../shared/EditorContext';
import './CanvasParams.css';

const CanvasParams = ({stageRef}) => {

  const [backgroundPalette, setBackgroundPalette] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const editorContext = useContext(EditorContext);

  const centerCanvas = () => {
    editorContext.updateDrawableZone(editorContext.params);
    stageRef.current.position(0, 0);
    stageRef.current.scale({
      x: 1,
      y: 1
    });
  }
  return (
    <div className="canvas-params d-flex p-2 px-3 text-white">
      <div className="d-flex">
        <MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3"
                noRipple
                onClick={() => {
                  setBackgroundPalette(!backgroundPalette);
                }}>
          <div className="color-selector transparent-canvas">
            <div className="selected-color" style={{ backgroundColor: editorContext.params.background.color }}/>
          </div>
        </MDBBtn>
        {
          backgroundPalette &&
          <div className="color-picker-wrapper top">
            <SketchPicker
              color={backgroundColor}
              onChange={(e) => {
                const color = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${e.rgb.a})`;
                setBackgroundColor(color);
                editorContext.setParams({background: { color }});
              }}
            />
          </div>
        }
      </div>

      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
        <label className="me-2">Width</label>
        <MDBInput
          className="text-white"
          type="number"
          value={editorContext.params.drawableZone.width || 0}
          onChange={(e) => {
            editorContext.setNewWidth(+e.target.value);
          }}
        />
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
        <label className="me-2">Height</label>
        <MDBInput
          className="text-white"
          type="number"
          value={editorContext.params.drawableZone.height || 0}
          onChange={(e) => {
            editorContext.setNewHeight(+e.target.value);
          }}
        />
      </div>
      <MDBBtn outline onClick={centerCanvas}>Center</MDBBtn>
    </div>
  )
}

export default CanvasParams;
