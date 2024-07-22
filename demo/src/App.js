import React from 'react'

import 'canvas-editor/dist/index.css'
import CanvasEditor from 'canvas-editor';

const inputParams = {
  type: 'agree',
  content: {
    author: 'Jackie Chong',
    role: 'Martial Art Professional',
    message: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.',
  }
}

const getCanvasExport = (e) => {
  console.log(e)
}

const App = () => {
  return <>
    <CanvasEditor headless={false} getCanvasExport={getCanvasExport} inputParams={inputParams}/>
  </>
}

export default App
