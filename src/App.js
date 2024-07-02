import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useEffect, useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

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
