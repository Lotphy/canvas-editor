import React, { useEffect, useRef } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useEditor } from '../shared/EditorContext';
import { Layer, Rect, Stage } from 'react-konva';
import Element from '../element/element';
import { TEMPLATES } from '../shared/constants';
import { sampleImagesUrls, svgPathData } from '../shared/sample-resources';

const HeadlessCanvas = ({ exportImageCallback, inputParams }) => {
  const stageRef = useRef(null);
  const editorContext = useEditor();

  useEffect(() => {
    applyParamsToTemplate();
  }, [inputParams])

  const applyParamsToTemplate = () => {
    editorContext.setElements([]);
    console.log('Generating...');
    let template;
    if (inputParams.id) {
      template = TEMPLATES.filter(template => template.id === inputParams.id).shift();
    } else {
      const templates = TEMPLATES.filter(template => template.type === inputParams.type);
      template = templates[Math.floor(Math.random() * templates.length)];
    }
    console.log(template)
    console.log('Template selected.');
    if (template) {
      // TODO Could be refactored
      template.elements.map(elem => {
        if (inputParams.content[elem.name] !== null) {
          if (elem.type === 'text' && inputParams.content[elem.name]) {
            elem.text = inputParams.content[elem.name];
            if (elem.customization?.minSize || elem.customization?.maxSize) {
              elem.fontSize = adjustTextSize(elem.text, elem.customization?.minSize, elem.customization?.maxSize);
              console.log(elem.fontSize)
            }
          }
          if (elem.type === 'image' && elem.name === 'picture1') {
            const field = inputParams.field;
            const fieldImages = sampleImagesUrls.filter(image => image.url.includes(field));
            const selectedImage = fieldImages.length > 0 ? fieldImages[Math.floor(Math.random() * fieldImages.length)] : sampleImagesUrls[Math.floor(Math.random() * sampleImagesUrls.length)];
            elem.src = selectedImage.url;
            elem.originalHeight = selectedImage.originalHeight;
            elem.originalWidth = selectedImage.originalWidth;
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

      editorContext.setElements(template.elements);
      editorContext.setParams(template.params);
      console.log('Elements update.', template.elements);
    }
  }

  useEffect(() => {
    if (editorContext?.elements?.length > 0) {
      setTimeout(() => {
        const imgData = editorContext.generateImageFromCanvas(stageRef, editorContext.params);
        exportImageCallback(imgData);
        console.log('Generation done!');
      }, 1000);
    }
  }, [editorContext?.elements]);

  const adjustTextSize = (text, minSize = 26, maxSize = 40) => {
    const textLength = text.length;

    // If text length is less than 20, return the max size
    if (textLength < 20) {
      return maxSize;
    }

    // If text length is 50 or more, return the minimum size
    if (textLength >= 50) {
      return minSize;
    }

    // Calculate the step decrease in font size for each character over 20 characters
    const sizeDecrease = (maxSize - minSize) / (50 - 20);
    const newSize = maxSize - ((textLength - 20) * sizeDecrease);

    return newSize;
  }

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
            fillLinearGradientColorStops={[
              0,
              editorContext.params.background.startColor ? editorContext.params.background.startColor : editorContext.params.background.color,
              1,
              editorContext.params.background.endColor ? editorContext.params.background.endColor : editorContext.params.background.color]}
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
