import Main from '../main/main';
import { EditorContext } from '../shared/context';
import { useState } from 'react';
import HeadlessCanvas from '../HeadlessCanvas/HeadlessCanvas';

function CanvasEditor({ headless, getCanvasExport, inputParams } = {headless: false}) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [params, setParams] = useState({
    background: '#FFF2DA',
    drawableZone: {
      x: 0,
      y: 0,
      width: 600,
      height: 400,
    }
  });

  const editorContext = {
    selectedElement,
    elements,
    params,
    setSelectedElement,
    deleteSelectedElement: () => {
      setSelectedElement(elem => {
        if (elem) {
          setElements(elems => Array.from(elems.filter((e) => e.id !== elem.id)));
        }
        return null;
      });
    },
    deleteElementById: (index) => {
      const elemsCopy = Array.from(elements.filter((elem) => elem.id !== index));
      setElements(elemsCopy);
      if (selectedElement?.id === index) {
        setSelectedElement(null);
      }
    },
    cloneElementAtIndex: (index, cloneData) => {
      const clone = {
        ...elements[index],
        ...cloneData
      };
      const elemsCopy = Array.from(elements);
      elemsCopy.splice(index + 1, 0, clone);
      setElements(elemsCopy);
      editorContext.setSelectedElement(clone);
    },
    setElements: (elems) => {
      setElements(elems);
    },
    setDrawableZone(drawableZone) {
      editorContext.params.drawableZone = drawableZone
      setParams({
        ...params,
        drawableZone
      })
    },
    setNewWidth(width) {
      setParams({
        ...params,
        drawableZone: {
          ...params.drawableZone,
          width
        }
      })
    },
    setNewHeight(height) {
      setParams({
        ...params,
        drawableZone: {
          ...params.drawableZone,
          height
        }
      })
    },
    setParams(newParams) {
      setParams({
        ...params,
        ...newParams
      });
    },
    updateDrawableZone: ({ drawableZone, ...otherParams }) => {
      const canvasWrapper = document.querySelector('.canvas-wrapper');
      if (canvasWrapper) {
        const height = drawableZone.height;
        const width = drawableZone.width;
        const canvasWidth = canvasWrapper.offsetWidth;
        const canvasHeight = canvasWrapper.offsetHeight;
        setParams({
          ...params,
          ...otherParams,
          drawableZone: {
            x: (canvasWidth - width) / 2,
            y: (canvasHeight - height) / 2,
            width: width,
            height: height
          }
        })
      }
    },
    generateImageFromCanvas(stageRef, canvasParams) {
      const exportRatio = 3;
      stageRef.current.position(0, 0);
      stageRef.current.scale({
        x: 1,
        y: 1
      });
      const stagePos = stageRef?.current?.position();
      const scale = stageRef?.current?.scale();
      const x = (canvasParams.drawableZone.x) * scale.x + stagePos.x; // Define the x position of the part to export
      const y = (canvasParams.drawableZone.y) * scale.y + stagePos.y; // Define the y position of the part to export
      const width = canvasParams.drawableZone.width * scale.x; // Define the width of the part to export
      const height = canvasParams.drawableZone.height * scale.y; // Define the height of the part to export

      // Create a new canvas to draw the specified part
      const canvas = document.createElement('canvas');
      canvas.width = width * exportRatio;
      canvas.height = height * exportRatio;
      const context = canvas.getContext('2d');

      // Extract the part from the stage and draw it on the new canvas
      context.drawImage(
        stageRef?.current?.toCanvas({
          x,
          y,
          width,
          height,
          pixelRatio: exportRatio
        }),
        0, 0, canvas.width, canvas.width,
        0, 0, canvas.width, canvas.width
      );

      // Convert the new canvas to a data URL
      return canvas.toDataURL('image/jpeg');
    },
    downloadCanvasImage(dataURL) {
      // Create a link element to download the JPG file
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'exported-part.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <EditorContext.Provider value={editorContext}>
      { headless ? <HeadlessCanvas exportImageCallback={getCanvasExport} inputParams={inputParams} /> : <Main />}
    </EditorContext.Provider>
  );
}

export default CanvasEditor;
