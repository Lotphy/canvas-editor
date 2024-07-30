import React  from 'react';
import Main from '../main/main';
import { EditorProvider } from '../shared/EditorContext';
import HeadlessCanvas from '../HeadlessCanvas/HeadlessCanvas';
import store from '../shared/store';
import { Provider } from 'react-redux';

function CanvasEditor({ headless, getCanvasExport, inputParams } = { headless: false }) {

  return (
    <EditorProvider>
      {headless ? <HeadlessCanvas exportImageCallback={getCanvasExport} inputParams={inputParams}/> : <Main/>}
    </EditorProvider>
  );
}

export default CanvasEditor;
