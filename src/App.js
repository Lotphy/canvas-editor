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
        "id": "adbe45b2-d63d-43e8-a733-81fef0df7679",
        "type": "image",
        "src": "/assets/samples/img/pikaso_texttoimage_35mm-film-photography-IT-engineer-developing-on-a-(1).jpeg",
        "x": 291.00000000000085,
        "y": 126.00000000000003,
        "originalWidth": 1216,
        "originalHeight": 832,
        "width": 266.6666666666667,
        "height": 200,
        "relativeX": -62.556999999999164,
        "relativeY": -2.6619999999999493,
        "stroke": "rgba(2,16,53,0.9)",
        "name": "element",
        "draggable": true,
        "rotation": 0,
        "scaleX": 2.025551001529749,
        "scaleY": 2.025551001529749,
        "skewX": 0,
        "skewY": 0,
        "offsetX": 0,
        "offsetY": 0,
        "mask": null,
        "strokeWidth": 200
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
        "relativeY": 52,
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
        "relativeX": 20.000000000000057,
        "relativeY": 55.00000000000017,
        "text": "Digital",
        "fontStyle": "bold",
        "name": "element",
        "x": 375,
        "y": 211.00000000000026,
        "draggable": true,
        "visible": true,
        "width": 139.00000000000009
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
        "relativeY": 105,
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
        "id": "29ee371b-01a9-4dc7-8322-f3e8f3e222d7",
        "type": "image",
        "src": "/assets/samples/img/pikaso_texttoimage_35mm-film-photography-multicultural-3-persons-blac.jpeg",
        "x": 310.99999999999943,
        "y": 332.99999999999955,
        "originalWidth": 1216,
        "originalHeight": 832,
        "width": 292.3076923076923,
        "height": 200,
        "relativeX": 15,
        "relativeY": 200,
        "stroke": "rgba(3,201,175,1)",
        "name": "element",
        "draggable": true,
        "rotation": 0,
        "scaleX": 0.9369966553479964,
        "scaleY": 0.9369966553479955,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "mask": "M 12 17 L 12 100 C 12 149.300781 52.5 189.101562 102.101562 188 C 148.898438 186.898438 187.101562 148.601562 188 101.800781 C 188.5 76.800781 178.5 54.101562 162.199219 37.800781 C 146.300781 21.898438 124.300781 12 100 12 L 17 12 C 14.300781 12 12 14.300781 12 17 Z M 12 17 ",
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
        "relativeX": 198.00185999999997,
        "relativeY": 9.999999999997272,
        "text": "Webinar",
        "fontStyle": "bold",
        "name": "element",
        "x": 317.40185999999994,
        "y": 135.99999999999847,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 185.9332199999972
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
        "relativeX": 167.48253599999964,
        "relativeY": 230,
        "text": "11 juillet",
        "fontStyle": "bold",
        "name": "element",
        "x": 458.48253599999964,
        "y": 337.65502399999934,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 216.13044200000016
      },
      {
        "id": "bb73ccd0-6a98-4e1d-b3f7-79a3bfe9afff",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(3,201,175,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 34,
        "fontFamily": "Voye, cursive",
        "align": "right",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 166.4091209999998,
        "relativeY": 275,
        "text": "18h-23h",
        "fontStyle": "bold",
        "name": "element",
        "x": 451.9091209999998,
        "y": 393.0862439999995,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 216.5024698100002
      },
      {
        "id": "fd69cfc4-b19c-48ca-9d6a-e035edbed380",
        "type": "text",
        "fillAfterStrokeEnabled": true,
        "fill": "rgba(255,255,255,1)",
        "strokeWidth": 0,
        "stroke": "white",
        "fontSize": 26,
        "fontFamily": "Lato, sans-serif",
        "align": "right",
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 208.22843899999998,
        "relativeY": 323.65965900000003,
        "text": "Follow pour être notifié",
        "fontStyle": "bold",
        "name": "element",
        "x": 501,
        "y": 416,
        "draggable": true,
        "rotation": 0,
        "offsetX": 0,
        "offsetY": 0,
        "skewX": 0,
        "skewY": 0,
        "visible": true,
        "width": 174.24
      },
      {
        "id": "085b9c24-05b2-40c9-9e4e-e5ae20cd80f3",
        "type": "rectangle",
        "stroke": "rgba(3,201,175,1)",
        "strokeWidth": 8,
        "fill": "rgba(255,255,255,1)",
        "opacity": 1,
        "scaleX": 1,
        "scaleY": 1,
        "relativeX": 347.6280015160387,
        "relativeY": 96.99999999999966,
        "width": 101.8439969679211,
        "height": 99.99999999999906,
        "fillAfterStrokeEnabled": true,
        "cornerRadius": 57,
        "name": "element",
        "x": 613.6999999999998,
        "y": 223
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
