import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useEffect, useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [params, setParams] = useState({
    background: 'green',
    drawableZone: {
      x: 0,
      y: 0,
      width: 400,
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
  }

  return (
    <div className="App">
      <EditorContext.Provider value={editorContext}>
        <Main/>
      </EditorContext.Provider>
    </div>
  );
}

export default App;
