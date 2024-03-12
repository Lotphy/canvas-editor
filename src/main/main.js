import React, { useRef, useEffect, useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Stage, Layer, Rect, Group, Transformer } from 'react-konva';
import LayersMenu from '../LayersMenu/LayersMenu';
import Element from '../element/element';
import './main.css';
import SideMenu from '../SideMenu/SideMenu';

const Main = () => {
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const transformerRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    initEventsListeners();
    // Update canvas size on window resize
    const updateCanvasSize = () => {

      const canvasWrapper = document.querySelector('.canvas-wrapper');
      if (canvasWrapper) {
        const width = canvasWrapper.offsetWidth;
        const height = canvasWrapper.offsetHeight;
        setCanvasSize({
          width,
          height,
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      removeEventsListeners();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target.attrs?.name === 'stage';
    if (clickedOnEmpty) {
      setSelectedElement(null);
    }
  };

  const handleAddElement = (event) => {
    const newElement = event.detail.elem;
    setElements(prevElements => [...prevElements, newElement]);
  };

  const deleteElementById = (event) => {
    const id = event.detail.id;
    setElements(elements => elements.filter((elem) => elem.id !== id));
    setSelectedElement(null);
  };

  const getElementById = (event) => {
    const id = event.detail.id;
    setSelectedElement(id);
  };

  const getAllElements = () => {
    return layerRef.current.getChildren();
  }

  const initEventsListeners = () => {
    document.addEventListener('addElement', handleAddElement);
    document.addEventListener('getElementById', getElementById);
    document.addEventListener('deleteElementById', deleteElementById);
    document.addEventListener('getAllElements', getAllElements);
  }

  const removeEventsListeners = () => {
    document.addEventListener('addElement', handleAddElement);
    document.addEventListener('getElementById', getElementById);
    document.addEventListener('deleteElementById', deleteElementById);
    document.addEventListener('getAllElements', getAllElements);
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <SideMenu />

      <MDBContainer fluid style={{ flex: '1', overflow: 'hidden', position: 'relative' }} className="canvas-wrapper p-0">
        <Stage
          className="h-100 w-100 d-flex"
          width={canvasSize.width}
          height={canvasSize.height}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {/* Gray background */}
            <Rect name="stage" width={canvasSize.width} height={canvasSize.height} fill="#ccc" />

            {/* Brighter square shape representing the drawable zone */}
            <Rect
              name="stage"
              x={(canvasSize.width - 400) / 2} // Adjust the square position as needed
              y={(canvasSize.height - 400) / 2} // Adjust the square position as needed
              width={400} // Adjust the square size as needed
              height={400} // Adjust the square size as needed
              fill="#fff" // Adjust the square color as needed
              stroke="#999" // Adjust the stroke color as needed
              strokeWidth={2} // Adjust the stroke width as needed
            />

            {/* Render Elements */}
            <Group
              ref={layerRef}
              clipFunc={(ctx) => ctx.rect((canvasSize.width - 400) / 2, (canvasSize.height - 400) / 2, 400, 400)}
            >
              {elements.map((element, i) => {
                return (
                  <React.Fragment key={i}>
                    <Element
                      id={element.id}
                      shapeProps={{...element, x: element.x + canvasSize.width / 2, y: element.y + canvasSize.height / 2}}
                      isSelected={element.id === selectedElement}
                      canvasSize={canvasSize}
                      onSelect={() => {
                        setSelectedElement(element.id);
                      }}
                      onChange={(newAttrs) => {
                        const elems = elements.slice();
                        elems[i] = newAttrs;
                        setElements(elems);
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </Group>

            {/* Transformer for the selected element */}
            {selectedElement && (
              <Transformer
                ref={transformerRef}
                nodes={stageRef.current.findOne(`#${selectedElement}`) && [stageRef.current.findOne(`#${selectedElement}`)]} // Assuming elements have unique IDs
                boundBoxFunc={(oldBox, newBox) => {
                  // limit resize
                  if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
      </MDBContainer>
    </div>
  );
};

export default Main;
