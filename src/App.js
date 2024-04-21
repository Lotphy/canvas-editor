import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useEffect, useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  // const [elements, setElements] = useState([])
  const [elements, setElements] = useState([
    {
      "id": "13f8dd22-e66c-47f2-873d-d018a5ba2bcf",
      "type": "rectangle",
      "stroke": "rgb(97,146,220)",
      "strokeWidth": 0,
      "fill": "rgba(198,213,255,1)",
      "opacity": 1,
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": -13.760334625875657,
      "relativeY": -13.80673488368275,
      "width": 430.24442304987525,
      "height": 430.24442304987525,
      "fillAfterStrokeEnabled": true,
      "cornerRadius": 0,
      "name": "element",
      "x": 437.23966537412434,
      "y": 41.69326511631725,
      "draggable": true,
      "rotation": 0,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 0,
      "skewY": 0
    },
    {
      "id": "4759edbe-1b43-4129-85b5-ff70632c2fde",
      "type": "rectangle",
      "stroke": "rgba(74,144,226,1)",
      "strokeWidth": 8,
      "fill": "rgba(0,28,46,1)",
      "opacity": 1,
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": 16.828300000006493,
      "relativeY": 164.64254678786688,
      "width": 220.99325321213985,
      "height": 220.99325321213993,
      "fillAfterStrokeEnabled": true,
      "cornerRadius": 4,
      "name": "element",
      "x": 467.8283000000065,
      "y": 220.14254678786688,
      "draggable": true,
      "rotation": 0,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 0,
      "skewY": 0
    },
    {
      "id": "476a3895-3472-4c00-8299-1bae11470003",
      "type": "circle",
      "fill": "rgba(255,255,255,1)",
      "stroke": "rgba(74,144,226,1)",
      "strokeWidth": 16,
      "relativeX": 445.47557710188835,
      "relativeY": 239.06989824027,
      "fillAfterStrokeEnabled": true,
      "name": "element",
      "x": 896.4755771018883,
      "y": 294.56989824027,
      "draggable": true,
      "radiusX": 182.33098358210296,
      "radiusY": 259.8652491560096,
      "rotation": 15.824517413323303,
      "scaleX": 1,
      "scaleY": 1,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 1.4988010832439507e-15,
      "skewY": 0
    },
    {
      "id": "dceae1c0-122e-410c-805e-cb3d1b4e6c2c",
      "type": "text",
      "fillAfterStrokeEnabled": true,
      "fill": "rgba(0,28,46,1)",
      "strokeWidth": 0,
      "stroke": "white",
      "fontSize": 36,
      "fontFamily": "Bolota, sans-serif",
      "align": "left",
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": 18.855268595039433,
      "relativeY": 66.31764132231336,
      "text": "Stratégie Commerciale",
      "fontStyle": "bold",
      "name": "element",
      "x": 469.85526859503943,
      "y": 121.81764132231336,
      "draggable": true,
      "rotation": 0,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 0,
      "skewY": 0,
      "visible": true,
      "width": 268.6200000000021
    },
    {
      "id": "3b08abc3-b619-4908-b115-8fe9cc345222",
      "type": "text",
      "fillAfterStrokeEnabled": true,
      "fill": "rgba(74,144,226,1)",
      "strokeWidth": 0,
      "stroke": "white",
      "fontSize": 50,
      "fontFamily": "Bolota, sans-serif",
      "align": "left",
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": 319.75850000000014,
      "relativeY": 384.1876000000031,
      "text": "Bilan 2024",
      "fontStyle": "bold",
      "name": "element",
      "x": 770.7585000000001,
      "y": 439.6876000000031,
      "draggable": true,
      "rotation": -90.00000000000001,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 2.7796796767533314e-16,
      "skewY": 0,
      "visible": true,
      "width": 316.7780000000012
    },
    {
      "id": "3e19b212-8b13-441e-a4cb-012d568ec02e",
      "type": "text",
      "fillAfterStrokeEnabled": true,
      "fill": "rgba(255,255,255,1)",
      "strokeWidth": 0,
      "stroke": "white",
      "fontSize": 24,
      "fontFamily": "Wave, cursive",
      "align": "center",
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": 29.263636363634646,
      "relativeY": 194.76363636363465,
      "text": "Segmenter\n\nPositionner\n\nInnover\n\nFidéliser",
      "fontStyle": "",
      "name": "element",
      "x": 480.26363636363465,
      "y": 250.26363636363465,
      "draggable": true,
      "rotation": 0,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 0,
      "skewY": 0,
      "visible": true,
      "width": 192.00000000000009
    },
    {
      "id": "4544de57-7080-4c75-b75d-8865b8608707",
      "type": "text",
      "fillAfterStrokeEnabled": true,
      "fill": "rgba(152,0,197,1)",
      "strokeWidth": 0,
      "stroke": "white",
      "fontSize": 30,
      "fontFamily": "MadimiOne, cursive",
      "align": "left",
      "scaleX": 1,
      "scaleY": 1,
      "relativeX": 18.412532386409453,
      "relativeY": 22.328056810914163,
      "text": "New story !",
      "fontStyle": "bold",
      "name": "element",
      "x": 469.41253238640945,
      "y": 77.82805681091416,
      "draggable": true,
      "rotation": 0,
      "offsetX": 0,
      "offsetY": 0,
      "skewX": 0,
      "skewY": 0,
      "visible": true,
      "width": 206.61157024793394
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
    setElements
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
