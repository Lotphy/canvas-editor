import React  from 'react';
import { MDBBtn, MDBIcon, } from 'mdb-react-ui-kit';
import './TextMenu.css';

const TextMenu = () => {

  const handleAddElement = () => {
    const id = crypto.randomUUID();
    const newElement = {
      id,
      type: 'text',
      fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      fontSize: 32,
      fontFamily: 'Arial',
      text: 'Sample Text',
      align: 'center',
      x: -75,
      y: -50
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