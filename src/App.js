import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';

function App() {
  const editorContext = {
    selectedElement: null
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
