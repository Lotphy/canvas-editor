import React  from 'react';
import { MDBCol, MDBIcon, MDBRow, } from 'mdb-react-ui-kit';
import './ShapeMenu.css';

const ShapeMenu = () => {
  const handleAddElement = (index) => {
    const id = crypto.randomUUID();
    let newElement;
    const shape = shapesList[index].shapeType;

    switch (shape) {
      case 'rect':
        newElement = {
          id,
          type: 'rectangle',
          stroke: 'black',
          strokeWidth: 0,
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          relativeX: 150,
          relativeY: 150,
          width: 100,
          height: 100,
          ...shapesList[index].canvasStyle,
        };
        break;
      case 'circle':
        newElement = {
          id,
          type: 'circle',
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          stroke: 'black',
          strokeWidth: 2,
          relativeX: 150,
          relativeY: 150,
          radius: {
            x: 50,
            y: 50
          },
          ...shapesList[index].canvasStyle,
        };
        break;
      default:
        return;
    }
    document.dispatchEvent(new CustomEvent('addElement', {detail: {elem: newElement}}));
  };

  const shapesList = [
    {
      shapeType: 'circle',
      style: {
        icon: 'circle',
        iconType: 'far'
      },
      canvasStyle: {
        stroke: 'black',
        strokeWidth: 2,
        fill: `rgba(0, 0, 0, 0)`,
      }
    },
    {
      shapeType: 'circle',
      style: {
        icon: 'circle',
        iconType: 'fas'
      },
      canvasStyle: {
        stroke: 'rgb(113,97,220)',
        strokeWidth: 2,
        fill: `rgb(170, 200, 255)`,
      }
    },
    {
      shapeType: 'rect',
      style: {
        icon: 'square',
        iconType: 'far'
      },
      canvasStyle: {
        stroke: 'rgb(113,97,220)',
        strokeWidth: 2,
        fill: `rgba(0, 0, 0, 0)`,
        cornerRadius: 16
      }
    },
    {
      shapeType: 'rect',
      style: {
        icon: 'square',
        iconType: 'fas'
      },
      canvasStyle: {
        stroke: 'rgb(113,97,220)',
        strokeWidth: 2,
        fill: `rgb(170, 200, 255)`,
        cornerRadius: 16
      }
    }
  ];

  const renderAssetsList = () => {
    return shapesList.map((shapeParams, index) => {
      return (
        <MDBCol className="col-4 text-center element-selector p-0" key={index}>
          <MDBIcon className={`shape-btn ${shapeParams.style.iconType}`} icon={shapeParams.style.icon} onClick={() => handleAddElement(index)}/>
        </MDBCol>
      )
    })
  }

  return (
    <MDBRow className="d-flex m-0">
      {renderAssetsList()}
      {/*<MDBCol className="col-4 text-center element-selector p-0">*/}
      {/*  <MDBIcon className="shape-btn" far icon="circle" onClick={() => handleAddElement('circle')}/>*/}
      {/*</MDBCol>*/}
      {/*<MDBCol className="col-4 text-center element-selector p-0">*/}
      {/*  <MDBIcon className="shape-btn" far icon="star" onClick={() => handleAddElement('rect')}/>*/}
      {/*</MDBCol>*/}
      {/*<MDBCol className="col-4 text-center element-selector p-0">*/}
      {/*  <MDBIcon className="shape-btn" fas icon="circle" onClick={() => handleAddElement('circle')}/>*/}
      {/*</MDBCol>*/}
      {/*<MDBCol className="col-4 text-center element-selector p-0">*/}
      {/*  <MDBIcon className="shape-btn" fas icon="star" onClick={() => handleAddElement('rect')}/>*/}
      {/*</MDBCol>*/}
      {/*<MDBCol className="col-4 text-center element-selector p-0">*/}
      {/*  <MDBIcon className="shape-btn" fas icon="square-full" onClick={() => handleAddElement('rect')}/>*/}
      {/*</MDBCol>*/}
    </MDBRow>
  );
};

export default ShapeMenu;