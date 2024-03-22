import React  from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import './TextMenu.css';

const TextMenu = () => {

  const handleAddElement = () => {
    const id = crypto.randomUUID();
    const newElement = {
      id,
      type: 'text',
      fillAfterStrokeEnabled: true,
      fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      strokeWidth: 0,
      stroke: 'black',
      fontSize: 32,
      fontFamily: 'Arial',
      text: 'Sample Text',
      align: 'left',
      scaleX: 1,
      scaleY: 1,
      width:200,
      relativeX: 75,
      relativeY: 50
    };
    document.dispatchEvent(new CustomEvent('addElement', {detail: {elem: newElement}}));
  };

  return (
    <>
      <MDBBtn onClick={handleAddElement} className="element-btn">
        Sample text
      </MDBBtn>
    </>
  );
};

export default TextMenu;