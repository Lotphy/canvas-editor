import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useEffect, useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([
    {
      "id": "d9a67596-e824-4c25-adc5-25cad975269d",
      "type": "image",
      "src": "/assets/samples/img/6.jpg",
      "x": 368.68249360677976,
      "y": 109.00000000000004,
      "originalWidth": 2000,
      "originalHeight": 1500,
      "width": 266.6666666666667,
      "height": 200,
      "relativeX": 0,
      "relativeY": 0,
      "name": "element",
      "draggable": true,
      "rotation": 0,
      "scaleX": 1.2299406489745752,
      "scaleY": 1.229940648974575,
      "skewX": 0,
      "skewY": 0,
      opacity: 1,
      stroke: "#999",
      "mask": "M 196.605469 100 C 196.605469 112.074219 180.378906 121.132812 175.847656 131.699219 C 171.320312 142.640625 176.226562 160.378906 167.925781 168.679688 C 159.621094 176.980469 141.886719 172.074219 130.945312 176.605469 C 120.378906 181.132812 111.320312 197.359375 99.246094 197.359375 C 87.167969 197.359375 78.113281 181.132812 67.546875 176.605469 C 56.605469 172.074219 38.867188 176.980469 30.566406 168.679688 C 22.265625 160.378906 27.167969 142.640625 22.640625 131.699219 C 18.113281 121.132812 1.886719 112.074219 1.886719 100 C 1.886719 87.925781 18.113281 78.867188 22.640625 68.300781 C 27.167969 57.359375 22.265625 39.621094 30.566406 31.320312 C 38.867188 23.019531 56.605469 27.925781 67.546875 23.394531 C 78.113281 18.867188 87.167969 2.640625 99.246094 2.640625 C 111.320312 2.640625 120.378906 18.867188 130.945312 23.394531 C 141.886719 27.925781 159.621094 23.019531 167.925781 31.320312 C 176.226562 39.621094 171.320312 57.359375 175.847656 68.300781 C 180.378906 78.867188 196.605469 87.925781 196.605469 100 Z M 196.605469 100 "
    }
  ]);

  const editorContext = {
    selectedElement: selectedElement,
    elements: elements,
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
    }
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
