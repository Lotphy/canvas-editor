import React, { useRef, useEffect, useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit'; // Assuming you're using MDBootstrap
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Transformer } from 'react-konva';
import SideMenu from '../side_menu/SideMenu';
import Element from '../element/element';
import './main.css';

const Main = () => {
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    // Update canvas size on window resize
    const updateCanvasSize = () => {
      setCanvasSize({
        width: 500,
        height: 500,
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const handleAddElement = (newElement) => {
    setElements([...elements, newElement]);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement(null);
    }
  };

  const deleteElementById = (id) => {
    setElements(elements.filter(elem => elem.id !== id));
  }

  const getElementById = (id) => {
    setSelectedElement(id)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <SideMenu onAddElement={handleAddElement} getElementById={getElementById} deleteElementById={deleteElementById} />

      <MDBContainer fluid style={{ flex: '1', overflow: 'auto', position: 'relative' }} className="canvas-wrapper p-0">
        <Stage
          className="h-100 w-100 d-flex"
          width={canvasSize.width}
          height={canvasSize.height}
          ref={stageRef}
          scaleX={canvasSize.width / 500} // Adjust as per your canvas size
          scaleY={canvasSize.height / 500} // Adjust as per your canvas size
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {/* Render Elements */}
            {elements.map((element, i) => {
              return (
                <React.Fragment key={i}>
                  <Element
                    shapeProps={element}
                    isSelected={element.id === selectedElement}
                    onSelect={() => {
                      setSelectedElement(element.id);
                    }}
                    onChange={(newAttrs) => {
                      const elems = elements.slice();
                      elems[i] = newAttrs;
                      setElements(elems);
                    }} />
                </React.Fragment>
              );
            })}
          </Layer>
        </Stage>
      </MDBContainer>
    </div>
  );
};

export default Main;
