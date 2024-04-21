import React, { useContext }  from 'react';
import { MDBCol, MDBIcon, MDBRow, } from 'mdb-react-ui-kit';
import './ShapeMenu.css';
import { EditorContext } from '../shared/context';

const ShapeMenu = () => {
  const editorContext = useContext(EditorContext);

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
          fillAfterStrokeEnabled: true,
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
          fillAfterStrokeEnabled: true,
          ...shapesList[index].canvasStyle,
        };
        break;
      default:
        return;
    }
    editorContext.setElements(elems =>[...elems, newElement]);
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
        strokeWidth: 4,
        fill: `rgba(0, 0, 0, 0)`,
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
        strokeWidth: 4,
        fill: `rgba(0, 0, 0, 0)`,
        cornerRadius: 16
      }
    },
    {
      shapeType: 'rect',
      style: {
        icon: 'square-full',
        iconType: 'far'
      },
      canvasStyle: {
        stroke: 'rgb(113,97,220)',
        strokeWidth: 4,
        fill: `rgb(0, 0, 0, 0)`,
        cornerRadius: 0
      }
    },
    {
      shapeType: 'circle',
      style: {
        icon: 'circle',
        iconType: 'fas'
      },
      canvasStyle: {
        stroke: 'rgb(220,115,97)',
        strokeWidth: 0,
        fill: `rgb(255, 213, 170)`,
      }
    },
    {
      shapeType: 'rect',
      style: {
        icon: 'square',
        iconType: 'fas'
      },
      canvasStyle: {
        stroke: 'rgb(189,97,220)',
        strokeWidth: 0,
        fill: `rgb(255, 170, 248)`,
        cornerRadius: 16
      }
    },
    {
      shapeType: 'rect',
      style: {
        icon: 'square-full',
        iconType: 'fas'
      },
      canvasStyle: {
        stroke: 'rgb(97,146,220)',
        strokeWidth: 0,
        fill: `rgb(170, 255, 225)`,
        cornerRadius: 0
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
    </MDBRow>
  );
};

export default ShapeMenu;