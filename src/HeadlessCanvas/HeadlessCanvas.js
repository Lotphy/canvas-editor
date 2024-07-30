import React, { useEffect, useRef } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useEditor } from '../shared/EditorContext';
import { Layer, Rect, Stage } from 'react-konva';
import Element from '../element/element';
import { TEMPLATES } from '../shared/constants';
import { svgPathData } from '../shared/sample-resources';

const HeadlessCanvas = ({ exportImageCallback, inputParams }) => {
  const stageRef = useRef(null);
  const editorContext = useEditor();

  useEffect(() => {
    applyParamsToTemplate();
  }, []);

  const applyParamsToTemplate = () => {
    const template = TEMPLATES.filter(template => template.type === inputParams.type).shift();

    // TODO Could be refactored
    template.elements.map(elem => {
      if (inputParams.content[elem.id] !== null) {
        if (elem.type === 'text' && inputParams.content[elem.id]) {
          elem.text = inputParams.content[elem.id];
        }
        if (elem.customization) {
          Object.keys(elem.customization).forEach(key => {
            elem[key] = inputParams.content[elem.customization[key]];
            if (key === 'mask') {
              const randomMask = svgPathData[Math.floor(Math.random() * svgPathData.length)];
              elem.mask = randomMask.path2D;
            }
          })
        }
      }
    });

    editorContext.setElements(template.elements)
    editorContext.setParams(template.params);
  }

  useEffect(() => {
    if (editorContext.elements.length > 0) {
      setTimeout(() => {
        const imgData = editorContext.generateImageFromCanvas(stageRef, editorContext.params);
        exportImageCallback(imgData);
      }, 1000)
    }
  }, [editorContext.elements]);

  return (
    <React.Fragment>
      <MDBBtn onClick={() => {
        const imgData = editorContext.generateImageFromCanvas(stageRef, editorContext.params);
        console.log(imgData)
      }}>EXPORT</MDBBtn>
      <Stage
        id="stage-canvas"
        className="h-100 w-100 d-flex"
        width={editorContext.params.drawableZone.width}
        height={editorContext.params.drawableZone.height}
        ref={stageRef}>
        <Layer>
          <Rect
            name="stage"
            x={editorContext.params.drawableZone?.x} // Adjust the square position as needed
            y={editorContext.params.drawableZone?.y} // Adjust the square position as needed
            width={editorContext.params.drawableZone?.width} // Adjust the square size as needed
            height={editorContext.params.drawableZone?.height} // Adjust the square size as needed
            // fill={editorContext.params.background} // Adjust the square color as needed
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: editorContext.params.drawableZone?.width, y: editorContext.params.drawableZone?.height }}
            fillLinearGradientColorStops={[0, 'white', 1, '#dae9ff']}
          />
          {editorContext.elements.map((element, i) => {
            return (
              <React.Fragment key={i}>
                <Element
                  shapeProps={{
                    ...element,
                    name: 'element',
                    x: (element.relativeX + editorContext.params.drawableZone?.x) || 0,
                    y: (element.relativeY + editorContext.params.drawableZone?.y) || 0
                  }}
                  stage={stageRef?.current?.getStage()}
                  onSelect={() => {}}
                  onChange={() => {}}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
    </React.Fragment>
  )
};

export default HeadlessCanvas;
