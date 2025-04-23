import React from 'react'
import 'canvas-editor/dist/index.css'
import CanvasEditor from 'canvas-editor/dist';

const inputParams = {
  id: 'template8',
  content: {
    title: 'Communication ouvertez',
    subtitle: 'Investir dans la formation et le développement personnel ',
  }
}

const getCanvasExport = (e) => {
  console.log(e)
}

const App = () => {
  console.log('DEBUG', inputParams)
  return <>
    <CanvasEditor headless={false} getCanvasExport={getCanvasExport} inputParams={inputParams}/>
  </>
}

export default App
