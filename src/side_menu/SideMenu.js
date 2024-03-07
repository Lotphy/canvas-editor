import React, { useEffect, useState } from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

const SideMenu = ({ onAddElement }) => {
  const [selectedTool, setSelectedTool] = useState('');
  const [elements, setElements] = useState([]);

  const handleAddElement = () => {
    let newElement;
    const id = crypto.randomUUID();
    if (selectedTool === 'text') {
      newElement = { type: 'text', text: 'Sample Text', x: 50, y: 50 };
    } else if (selectedTool === 'image') {
      // You can add your image logic here
    } else if (selectedTool === 'rectangle') {
      newElement = { type: 'rectangle', fill:'red', x: 50, y: 50, width: 100, height: 100 };
    } else if (selectedTool === 'circle') {
      newElement = { type: 'circle', x: 50, y: 50, radius: 50 };
    }
    newElement = { ...newElement, id };
    onAddElement(newElement);
    setElements([...elements, newElement]);
  };

  const renderLayers = () => {
    const layers = [];
    elements.forEach(elem => {
      const layer = <MDBRow key={elem.id}><MDBCol className="col-3">{elem.type}</MDBCol><MDBCol className="col-9">{elem.id}</MDBCol></MDBRow>;
      layers.push(layer);
    })
    return layers;
  }

  return (
    <div style={{ flex: '0 0 20%', backgroundColor: '#f0f0f0', padding: '10px' }}>
      {/* Select Field for Adding Elements */}
      <select
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
      >
        <option value="">Add New Element</option>
        <option value="text">text</option>
        <option value="image">image</option>
        <option value="rectangle">rectangle</option>
        <option value="circle">circle</option>
      </select>
      <button onClick={handleAddElement}>Add Element</button>
      {/* Layers View */}
      <div >
        <h5>Layers View</h5>
        <MDBRow>
          <MDBCol className="fw-bold col-3">
            Type
          </MDBCol>
          <MDBCol className="fw-bold col-9">
            Id
          </MDBCol>
        </MDBRow>
        {renderLayers()}
        {/* Layers view content goes here */}
      </div>
    </div>
  );
};

export default SideMenu;