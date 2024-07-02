import React, { useContext }  from 'react';
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import './TextMenu.css';
import { EditorContext } from '../shared/context';

const TextMenu = () => {
  const editorContext = useContext(EditorContext);

  const handleAddElement = (index) => {
    const id = crypto.randomUUID();
    const newElement = {
      id,
      type: 'text',
      fillAfterStrokeEnabled: true,
      fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      strokeWidth: 0,
      stroke: 'white',
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
    editorContext.setElements(elems =>[...elems, newElement]);
  };

  const textList = [
    {
      name: 'Voyage',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Voye, cursive',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'Voye, cursive',
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
      name: 'Wonder',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Wave, cursive',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'Wave, cursive',
      }
    },
    {
      name: 'Pixel',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Quadriana, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'Quadriana, sans-serif',
      }
    },
    {
      name: 'Mou mou',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'MadimiOne, cursive',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'MadimiOne, cursive',
      }
    },
    {
      name: 'BigBang',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Bolota, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'Bolota, sans-serif',
      }
    },
    {
      name: 'Beverly hills',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Beverage, cursive',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'normal',
        fontFamily: 'Beverage, cursive',
      }
    },
    {
      name: 'Oakland',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'OakSans, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'OakSans, sans-serif',
      }
    },
    {
      name: 'Aegis',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'RampartOne, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'bold',
        fontFamily: 'RampartOne, sans-serif',
      }
    },
    {
      name: 'Tokyo Zoo',
      style: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'TokyoZoo, sans-serif',
      },
      canvasStyle: {
        fill: 'rgba(0, 0, 0, 1)',
        fontSize: 48,
        fontStyle: 'normal',
        fontFamily: 'TokyoZoo, sans-serif',
      }
    },
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
      name: 'Stardust',
      style: {
        color: 'rgba(255, 167, 0, 1)',
        textShadow: 'rgba(255, 179, 0, 0.1) 0px 0px 8px',
        WebkitTextStroke: '1px rgb(0, 0, 0)',
        fontWeight: 'normal',
        fontFamily: 'Impact, sans-serif'
      },
      canvasStyle: {
        fill: 'rgba(255, 167, 0, 1)',
        strokeWidth: 4,
        stroke: 'black',
        fontSize: 90,
        fontFamily: 'Impact, sans-serif',
        shadowColor: 'rgba(255, 167, 0, 0.1)',
        shadowOpacity: 10,
        shadowBlur: 32,
        shadowOffset: { x: 0, y: 0 },
      }
    },
    {
      name: 'GAME OVER',
      style: {
        color: 'rgba(110, 0, 255, 0.5)',
        WebkitTextStroke: '1px rgb(0, 255, 234)',
        fontFamily: 'Quadriana, sans-serif',
        textShadow: '0 0 16px rgb(0,255,234)'
      },
      canvasStyle: {
        fill: 'rgba(110, 0, 255, 0.5)',
        strokeWidth: 2,
        stroke: 'rgb(0, 255, 234)',
        fontSize: 48,
        fontFamily: 'Quadriana, sans-serif',
        shadowColor: 'rgb(0,255,234)',
        shadowOpacity: 10,
        shadowBlur: 32,
        shadowOffset: { x: 0, y: 0 },
      }
    },
    {
      name: 'Glimmer',
      style: {
        color: 'rgba(221,97,255,0.7)',
        textShadow: 'rgb(221,97,255) 0px 0px 16px',
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
  ];


  const renderAssetsList = () => {
    return textList.map((textParam, index) => {
      return (
        <MDBCol className="col-6 mb-3" key={index}>
          <MDBBtn onClick={() => handleAddElement(index)} className="element-btn text-btn text-capitalize w-100"
                  style={{ ...textParam.style }}>
            {textParam.name}
          </MDBBtn>
        </MDBCol>
      )
    })
  }

  return (
    <>
    <MDBRow className="image-menu d-flex m-0">
      {renderAssetsList()}
    </MDBRow>
</>
)
  ;
};

export default TextMenu;