import React from 'react';
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import './TextMenu.css';

const TextMenu = () => {

  const handleAddElement = (index) => {
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
      align: 'left',
      scaleX: 1,
      scaleY: 1,
      relativeX: 75,
      relativeY: 50,
      text: textList[index].name,
      ...textList[index].canvasStyle,
    };
    document.dispatchEvent(new CustomEvent('addElement', { detail: { elem: newElement } }));
  };

  const textList = [
    {
      name: 'Superstar',
      style: {
        color: 'red',
        fontStyle: 'italic',
        fontFamily: 'Impact, sans-serif',
      },
      canvasStyle: {
        fill: 'red',
        fontStyle: 'italic',
        fontSize: 56,
        fontFamily: 'Impact, sans-serif'
      }
    },
    {
      name: 'Evolve',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Renovate, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'Renovate, sans-serif',
      }
    },
    {
      name: 'DUMPER',
      style: {
        color: 'rgba(255, 167, 0, 1)',
        textShadow: 'rgb(255, 179, 0) 0px 0px 24px',
        WebkitTextStroke: '3px rgb(0, 0, 0)',
        fontWeight: 'normal',
        fontSize: '60px',
        fontFamily: 'Impact, sans-serif'
      },
      canvasStyle: {
        fill: 'rgba(255, 167, 0, 1)',
        strokeWidth: 8,
        stroke: 'black',
        fontSize: 90,
        fontFamily: 'Impact, sans-serif',
        shadowColor: 'rgb(255, 167, 0)',
        shadowOpacity: 10,
        shadowBlur: 32,
        shadowOffset: { x: 0, y: 0 },
      }
    },{
      name: 'Glimmer',
      style: {
        color: 'rgba(221,97,255,0.7)',
        textShadow: 'rgb(221,97,255) 0px 0px 24px',
        fontWeight: 'normal',
        fontFamily: 'Impact, sans-serif'
      },
      canvasStyle: {
        fill: 'rgba(221,97,255,0.7)',
        strokeWidth: 0,
        fontSize: 90,
        fontFamily: 'Impact, sans-serif',
        shadowColor: 'rgb(221,97,255)',
        shadowOpacity: 10,
        shadowBlur: 32,
        shadowOffset: { x: 0, y: 0 },
      }
    },
    {
      name: 'GAME OVER',
      style: {
        color: 'rgba(255, 0, 0, 0.28)',
        WebkitTextStroke: '2px rgb(0, 255, 234)',
        fontFamily: 'Bolota, sans-serif',
        textShadow: '0 0 24px rgb(0,255,234)'
      },
      canvasStyle: {
        fill: 'rgba(255, 0, 0, 0.28)',
        strokeWidth: 4,
        stroke: 'rgb(0, 255, 234)',
        fontSize: 48,
        fontFamily: 'Bolota, sans-serif',
        shadowColor: 'rgb(0,255,234)',
        shadowOpacity: 10,
        shadowBlur: 32,
        shadowOffset: { x: 0, y: 0 },
      }
    },
  ];


  const renderAssetsList = () => {
    return textList.map((textParam, index) => {
      return (
        <MDBBtn onClick={() => handleAddElement(index)} className="element-btn text-btn text-capitalize w-100" style={{ ...textParam.style }}>
          {textParam.name}
        </MDBBtn>
      )
    })
  }

  return (
    <>
      <MDBRow className="image-menu d-flex m-0">
        <MDBCol className="col-12 mb-3" >
          {renderAssetsList()}
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default TextMenu;