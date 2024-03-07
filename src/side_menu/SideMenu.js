import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './SideMenu.css';

const SideMenu = ({ onAddElement, getElementById, deleteElementById }) => {
  const [selectedTool, setSelectedTool] = useState('');
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
    onAddElement(newElement);
    setElements([...elements, newElement]);
  };

  const onDeleteLayer = (id) => {
    setElements(elements.filter(elem => elem.id !== id));
    deleteElementById(id);
  }

  const renderLayers = () => {
    const layers = [];
    elements.forEach(elem => {
      const layer = (
        <MDBRow className="layer-row mb-2 mx-0" key={elem.id} onClick={() => getElementById(elem.id)}>
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
            <MDBBtn className="px-3 w-100" color="danger" onClick={() => onDeleteLayer(elem.id)}>
              <MDBIcon far icon="trash-alt" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>);
      layers.push(layer);
    })
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

export default SideMenu;