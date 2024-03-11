import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './LayersMenu.css';

const LayersMenu = () => {
  const [selectedTool, setSelectedTool] = useState('rectangle');
  const [elements, setElements] = useState([]);

  const handleAddElement = () => {
    let newElement;
    const id = crypto.randomUUID();
    if (selectedTool === 'text') {
      newElement = { type: 'text', fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, text: 'Sample Text', x: 50, y: 50 };
    } else if (selectedTool === 'image') {
      // You can add your image logic here
    } else if (selectedTool === 'rectangle') {
      newElement = { type: 'rectangle', fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, x: 50, y: 50, width: 100, height: 100 };
    } else if (selectedTool === 'circle') {
      newElement = { type: 'circle', x: 50, y: 50, radius: 50 };
    }
    newElement = { ...newElement, id };
    document.dispatchEvent(new CustomEvent('addElement', {detail: {elem: newElement}}));
    setElements([...elements, newElement]);
  };

  const onDeleteLayer = (e, id) => {
    e.stopPropagation();
    setElements(elements.filter(elem => elem.id !== id));
    document.dispatchEvent(new CustomEvent('deleteElementById', {detail: {id: id}}));
  }

  const renderLayers = () => {
    const layers = [];
    for(let i = elements.length - 1; i >= 0 ; i--) {
      const elem = elements[i];
      const layer = (
        <MDBRow className="layer-row mb-2 mx-0" key={elem.id} onClick={() => {
          document.dispatchEvent(new CustomEvent('getElementById', {detail: {id: elem.id}}));
        }}>
          <MDBCol className="layer-cell col-2">
            <span className="d-inline-block">
              {
                elem.type === 'rectangle' &&
                <i className="fas fa-shapes"></i>
              }
              {
                elem.type === 'text' &&
                <i className="fas fa-font"></i>
              }
            </span>
          </MDBCol>
          <MDBCol className="layer-cell col-2">
            <i className="fas fa-square" style={{color: elem.fill}}></i>
          </MDBCol>
          <MDBCol className="layer-cell col-5"><span className="d-inline-block">{elem.id}</span></MDBCol>
          <MDBCol className="layer-cell col-3 pe-0">
            <MDBBtn className="px-3 w-100" color="danger" onClick={(e) => onDeleteLayer(e, elem.id)}>
              <span className="flaticon-059-trash-can" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>);
      layers.push(layer);
    }
    return layers;
  }

  return (
    <div id="side-menu" className="d-flex flex-column" style={{ flex: '0 0 20%', maxWidth: '20%', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <select
        className="mb-2"
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
      >
        <option value="">Add New Element</option>
        <option value="text">text</option>
        <option value="image">image</option>
        <option value="rectangle">rectangle</option>
        <option value="circle">circle</option>
      </select>
      <MDBBtn onClick={handleAddElement}>
        <MDBIcon className="fas fa-plus"></MDBIcon>
      </MDBBtn>
      {/* Layers View */}
      <div className="overflow-auto">
        <h5 className="my-3">Layers</h5>

        {renderLayers()}
        {/* Layers view content goes here */}
      </div>
    </div>
  );
};

export default LayersMenu;