import './App.css';
import Main from './main/main';
import { EditorContext } from './shared/context';
import { useEffect, useState } from 'react';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState(
    [
      {
        "id": "246174bc-406d-428f-8f55-3be02d89c620",
        "type": "rectangle",
        "stroke": "rgba(189,16,224,1)",
        "strokeWidth": 0,
        "fill": "rgba(2,16,53,1)",
        "opacity": 1,
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": -0.1487238425011128,
        "relativeY": -0.05191360528442601,
        "width": 399.90667670456645,
        "height": 399.8669775607623,
        "fillAfterStrokeEnabled": true,
        "cornerRadius": 0,
        "name": "element",
        "x": 546.948109414944,
        "y": 120.9480863947156
      },
      {
        "id": "fc60965d-7dd1-49ce-ad78-b10a2973487f",
        "type": "rectangle",
        "stroke": "rgb(189,97,220)",
        "strokeWidth": 0,
        "fill": "rgba(255,255,255,1)",
        "opacity": 1,
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 20,
        "relativeY": 46,
        "width": 139.99999999999986,
        "height": 42.999999999999886,
        "fillAfterStrokeEnabled": true,
        "cornerRadius": 16,
        "name": "element",
        "x": 399.00000000000034,
        "y": 134.99999999999932
      },
      {
        "id": "3e371505-f303-48b3-b0ab-71294fa41a62",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(2,16,53,1)",
        "strokeWidth": 0,
        "stroke": "rgba(0,0,0,1)",
        "fontSize": 37,
        "fontFamily": "Arial, sans-serif",
        "align": "center",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 10,
        "relativeY": 50,
        "text": "Digital",
        "fontStyle": "bold",
        "name": "element",
        "x": 404.99999999999994,
        "y": 137.99999999999957,
        "draggable": true,
        "visible": true,
        "width": 169.00000000000009
      },
      {
        "id": "e01ba27e-440a-4b93-84d1-f07b89e8945a",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(3,201,175,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 46,
        "fontFamily": "Arial, sans-serif",
        "align": "left",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 20,
        "relativeY": 100,
        "text": "MARKETING",
        "fontStyle": "bold",
        "name": "element",
        "x": 399.99999999999955,
        "y": 205.999999999999,
        "draggable": true,
        "visible": true,
        "width": 283.0000000000004,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0
      },
      {
        "id": "d4ebdff3-2417-4e16-a87c-159019e79c0f",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(255,255,255,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 46,
        "fontFamily": "Arial, sans-serif",
        "align": "left",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 20,
        "relativeY": 150,
        "text": "STRATEGY",
        "fontStyle": "bold",
        "name": "element",
        "x": 417.99999999999955,
        "y": 210.999999999999,
        "draggable": true,
        "visible": true,
        "width": 284.00000000000006,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0
      },
      {
        "id": "29ee371b-01a9-4dc7-8322-f3e8f3e222d7",
        "type": "image",
        "src": "/assets/samples/img/pikaso_texttoimage_35mm-film-photography-multicultural-3-persons-blac.jpeg",
        "x": 406.4926907626591,
        "y": 268.49269076265955,
        "originalWidth": 1216,
        "originalHeight": 832,
        "width": 292.3076923076923,
        "height": 200,
        "relativeX": 20,
        "relativeY": 215,
        "stroke": "rgba(3,201,175,1)",
        "name": "element",
        "draggable": true,
        "rotation": 0,
        "scaleX": 0.7925351071530278,
        "scaleY": 0.7925351071530286,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "mask": "M 187.90625 100 L 184.652344 96.746094 L 187.90625 93.488281 C 198.605469 81.859375 198.140625 63.722656 186.511719 53.023438 L 140 9.300781 C 128.371094 -1.394531 110.234375 -0.929688 99.535156 10.699219 L 96.277344 13.953125 L 93.023438 10.699219 C 81.394531 0 63.253906 0.464844 52.558594 12.09375 L 8.835938 58.605469 C -1.859375 70.234375 -1.394531 88.371094 10.234375 99.070312 L 13.488281 102.324219 L 10.234375 105.582031 C -0.464844 117.210938 0 135.347656 11.628906 146.046875 L 58.140625 189.765625 C 69.765625 200.464844 87.90625 200 98.605469 188.371094 L 101.859375 185.117188 L 105.117188 188.371094 C 116.746094 199.070312 134.882812 198.605469 145.582031 186.976562 L 189.300781 140.464844 C 200 128.835938 199.535156 110.699219 187.90625 100 Z M 187.90625 100 ",
        "strokeWidth": 8
      },
      {
        "id": "318f0776-d039-4ffd-8620-c7add15b8066",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(255,255,255,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 36,
        "fontFamily": "Voye, cursive",
        "align": "right",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 210,
        "relativeY": 10,
        "text": "Webinar",
        "fontStyle": "bold",
        "name": "element",
        "x": 298.24,
        "y": 37.10000000000001,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 173.03000000000006
      },
      {
        "id": "2bea0adb-241e-41c2-b661-f3da7780f8c6",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(3,201,175,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 42,
        "fontFamily": "Voye, cursive",
        "align": "right",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 210,
        "relativeY": 240,
        "text": "11 juillet",
        "fontStyle": "bold",
        "name": "element",
        "x": 501,
        "y": 275.5,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 173.03000000000006
      },
      {
        "id": "fd69cfc4-b19c-48ca-9d6a-e035edbed380",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(255,255,255,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 26,
        "fontFamily": "Voye, cursive",
        "align": "right",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 210,
        "relativeY": 300,
        "text": "Follow pour être notifié",
        "fontStyle": "bold",
        "name": "element",
        "x": 501,
        "y": 335.5,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 174.24
      }
    ]
  );

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
