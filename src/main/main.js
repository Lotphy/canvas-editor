import React, { useRef, useEffect, useState, useContext } from 'react';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { Stage, Layer, Rect, Group, Transformer } from 'react-konva';
import Element from '../element/element';
import './main.css';
import SideMenu from '../SideMenu/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDrawableZone,
  setDrawableZone,
} from '../shared/store/stage.reducer';
import AttrsMenu from '../AttrsMenu/AttrsMenu';
import { EditorContext } from '../shared/context';
import Konva from 'konva';

const Main = () => {
  const stageRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const editorContext = useContext(EditorContext);

  const selectedElementIdRef = useRef(null);

  const transformerRef = useRef(null);
  const layerRef = useRef(null);
  const dispatch = useDispatch();
  const drawableZone = useSelector(getDrawableZone);

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

  useEffect(() => {
    enableZooming();
    // Update canvas size on window resize
    updateDrawableZone(drawableZone)
    const onKeyPress = (e) => {
      switch (e.key) {
        case 'Delete':
          let textarea = document.getElementById('text-editor');
          // Check if text editor is not toggled
          if (!textarea) {
            editorContext.deleteSelectedElement();
          }
          break;
        default:
          return;
      }
    }

    const initEventsListeners = () => {
      window.addEventListener('resize', updateCanvasSize);
      document.addEventListener('keyup', onKeyPress);
    }

    const removeEventsListeners = () => {
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('keyup', onKeyPress);
    }
    updateCanvasSize();
    initEventsListeners();

    return () => {
      removeEventsListeners();
    };
  }, []);

  useEffect(() => {
    // window.dispatchEvent(new Event('resize'));
  }, [editorContext.selectedElement]);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target.attrs?.name === 'stage' || e.target.attrs?.id === 'stage-canvas';
    if (clickedOnEmpty) {
      editorContext.setSelectedElement(null);
    }
  };

  const enableZooming = () => {
    const stage = stageRef.current;
    const scaleBy = 1.1;
    stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault();

      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY < 0 ? 1 : -1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
    });
  }

  const centerCanvas = () => {
    stageRef.current.position(0, 0);
    stageRef.current.scale({
      x: 1,
      y: 1
    });
  }

  const updateDrawableZone = ({height, width}) => {
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    if (canvasWrapper) {
      const canvasWidth = canvasWrapper.offsetWidth;
      const canvasHeight = canvasWrapper.offsetHeight;
      dispatch(setDrawableZone({
        drawableZone: {
          x: (canvasWidth - width) / 2,
          y: (canvasHeight - height) / 2,
          width: width,
          height: height
        }
      }));
    }
  }

  const renderCanvasParams = () => {
    return <div className="canvas-params d-flex p-2 px-3 text-white">
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
        <label className="me-2">Width</label>
        <MDBInput
          className="text-white"
          type="number"
          value={drawableZone.width || 0}
          onChange={(e) => {
            updateDrawableZone({ height: drawableZone.height, width: +e.target.value });
          }}
        />
      </div>
      <div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
        <label className="me-2">Height</label>
        <MDBInput
          className="text-white"
          type="number"
          value={drawableZone.height || 0}
          onChange={(e) => {
            updateDrawableZone({ width: drawableZone.width, height: +e.target.value });
          }}
        />
      </div>
      <MDBBtn outline onClick={centerCanvas}>Center</MDBBtn>
    </div>
  }

  return (
    <div className="d-flex vh-100 flex-column">
      <div className="d-flex w-100 h-100">
        <SideMenu stageRef={stageRef}/>

        <MDBContainer fluid
                      style={{ flex: '1', overflow: 'hidden', position: 'relative' }}
                      className="canvas-wrapper p-0">
          <AttrsMenu el={editorContext.selectedElement}
                     node={layerRef}
                     id={editorContext.selectedElement?.id}
                     onChange={(newAttrs) => {
                       const elems = editorContext.elements.slice().map(e => {
                         if (e.id === editorContext.selectedElement?.id) {
                           return { ...e, ...newAttrs };
                         }
                         return e;
                       })
                       editorContext.setElements([...elems]);
                     }}
          />

          {renderCanvasParams()}

          <Stage
            id="stage-canvas"
            className="h-100 w-100 d-flex"
            width={canvasSize.width * 2}
            height={canvasSize.height * 2}
            ref={stageRef}
            onMouseDown={(e) => {
              if (e.evt.button === 1) {
                // Use mouse wheel button as drag button
                stageRef.current.setAttr('draggable', true);
              } else {
                checkDeselect(e);
              }
            }}
            onMouseUp={(e) => {
              stageRef.current.setAttr('draggable', false);
            }}
            onTouchStart={checkDeselect}
          >
            <Layer>

              {/* Brighter square shape representing the drawable zone */}
              <Rect
                name="stage"
                x={drawableZone?.x} // Adjust the square position as needed
                y={drawableZone?.y} // Adjust the square position as needed
                width={drawableZone?.width} // Adjust the square size as needed
                height={drawableZone?.height} // Adjust the square size as needed
                fill="#fff" // Adjust the square color as needed
                stroke="#999" // Adjust the stroke color as needed
                strokeWidth={2} // Adjust the stroke width as needed
              />

              {/* Render Elements */}
              <Group
                ref={layerRef}
                clipFunc={(ctx) => ctx.rect(drawableZone?.x, drawableZone?.y, drawableZone?.width, drawableZone?.height)}
              >
                {editorContext.elements.map((element, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Element
                        shapeProps={{
                          ...element,
                          name: 'element',
                          x: (element.relativeX + drawableZone?.x) || 0,
                          y: (element.relativeY + drawableZone?.y) || 0
                        }}
                        isSelected={element.id === editorContext.selectedElement?.id}
                        stage={stageRef?.current?.getStage()}
                        transformer={transformerRef}
                        onMouseDown={(e) => {
                          if (e.evt.button === 1) {
                            console.log('DRAG', e.target)
                            // Use mouse wheel button as drag button
                            e.target.setAttr('draggable', false);
                          }
                        }}
                        onMouseUp={(e) => {
                          if (e.evt.button === 1) {
                            // Use mouse wheel button as drag button
                            e.target.setAttr('draggable', true);
                          }
                        }}
                        onSelect={() => {
                          editorContext.setSelectedElement(element);
                        }}
                        onChange={(newAttrs) => {
                          const elems = editorContext.elements.slice();
                          elems[i] = newAttrs;
                          editorContext.setElements(elems);
                        }}
                      />
                    </React.Fragment>
                  );
                })}
              </Group>

              {/* Transformer for the selected element */}
              {editorContext.selectedElement?.id && (
                <Transformer
                  ref={transformerRef}
                  rotationSnaps={[-45, -90, -180, -225, -270, -315, 0, 45, 90, 180, 225, 270, 315]}
                  rotateAnchorCursor="all-scroll"
                  anchorStyleFunc={(anchor) => {
                    if (editorContext.selectedElement?.type === 'text') {
                      if (anchor.name().includes('middle-right') || anchor.name().includes('middle-left')) {
                        anchor.height(24);
                        const selectedNode = stageRef.current.findOne(`#${editorContext.selectedElement?.id}`);
                        if (selectedNode) {
                          const pos = anchor.position();
                          const trHeight = selectedNode.height();
                          anchor.x(pos.x);
                          anchor.y(((trHeight - anchor.height()) / 2 + 4) * stageRef.current.scale().x);
                        }
                      } else {
                        anchor.visible(false);
                      }
                    }
                    if (anchor.name() === 'rotater _anchor') {
                      anchor.visible(true);
                      // make rotater anchor filled black and looks like a circle
                      anchor.fill('#e8ffe5');
                      anchor.cornerRadius(anchor.width() / 2);
                    } else {
                      anchor.cornerRadius(2);
                      anchor.stroke('#7a00ec');
                    }
                  }}
                  nodes={layerRef.current.findOne(`#${editorContext.selectedElement?.id}`) && [layerRef.current.findOne(`#${editorContext.selectedElement?.id}`)]} // Assuming elements have unique IDs
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                >
                </Transformer>
              )}
            </Layer>

          </Stage>
        </MDBContainer>

      </div>
    </div>
  );
};

export default Main;
