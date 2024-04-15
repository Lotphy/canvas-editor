import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);

  const editorContext = {
    selectedElement: selectedElement,
    setSelectedElement: (element) => {
      setSelectedElement(element);
    }
  }
  return (
    <div className="App">
      <EditorContext.Provider value={editorContext}>
        <Main />
      </EditorContext.Provider>
    </div>
  );
}

export default App;
