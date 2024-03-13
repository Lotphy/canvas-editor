import React  from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow, } from 'mdb-react-ui-kit';
import './ShapeMenu.css';

const ShapeMenu = () => {

  const handleAddElement = (shape) => {
    const id = crypto.randomUUID();
    let newElement;

    switch (shape) {
      case 'rect':
        newElement = {
          id,
          type: 'rectangle',
          stroke: 'black',
          strokeWidth: 0,
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          cornerRadius: 0,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          x: 50,
          y: 50,
          width: 100,
          height: 100
        };
        break;
      case 'circle':
        newElement = {
          id,
          type: 'circle',
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          x: 50,
          y: 50,
          radius: {
            x: 50,
            y: 50
          },
        };
        break;
      default:
        return;
    }
    document.dispatchEvent(new CustomEvent('addElement', {detail: {elem: newElement}}));
  };

  return (
    <MDBRow className="d-flex m-0">
      <MDBCol className="col-4 text-center element-selector p-0">
        <MDBIcon className="shape-btn" far icon="circle" onClick={() => handleAddElement('circle')}/>
      </MDBCol>
      <MDBCol className="col-4 text-center element-selector p-0">
        <MDBIcon className="shape-btn" far icon="star" onClick={() => handleAddElement('rect')}/>
      </MDBCol>
      <MDBCol className="col-4 text-center element-selector p-0">
        <MDBIcon className="shape-btn" fas icon="circle" onClick={() => handleAddElement('circle')}/>
      </MDBCol>
      <MDBCol className="col-4 text-center element-selector p-0">
        <MDBIcon className="shape-btn" fas icon="star" onClick={() => handleAddElement('rect')}/>
      </MDBCol>
      <MDBCol className="col-4 text-center element-selector p-0">
        <MDBIcon className="shape-btn" fas icon="square-full" onClick={() => handleAddElement('rect')}/>
      </MDBCol>
    </MDBRow>
  );
};

export default ShapeMenu;