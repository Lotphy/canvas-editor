import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './LayersMenu.css';
import { useSelector } from 'react-redux';
import { getStageElements } from '../shared/store/stage.reducer';

const LayersMenu = () => {
  const [selectedTool, setSelectedTool] = useState('rectangle');
  const [elements, setElements] = useState([]);
  const storeElements = useSelector(getStageElements);

  useEffect(() => {
    setElements(storeElements);
  }, [storeElements])

  const onDeleteLayer = (e, id) => {
    e.stopPropagation();
    document.dispatchEvent(new CustomEvent('deleteElementById', {detail: {id}}));
  }

  const renderLayers = () => {
    const layers = [];
    for(let i = elements?.length - 1; i >= 0 ; i--) {
      const elem = elements[i];
      const layer = (
        <MDBRow className="layer-row mb-2 mx-0" key={elem.id} onClick={() => {
          document.dispatchEvent(new CustomEvent('getElementById', {detail: {id: elem.id}}));
        }}>
          <MDBCol className="layer-cell col-2">
            <span className="d-inline-block">
              {
                elem.type === 'rectangle' &&
                <i className="fas fa-square"></i>
              }
              {
                elem.type === 'circle' &&
                <i className="fas fa-circle"></i>
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
              <span className="flaticon-059-trash-can fs-4" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>);
      layers.push(layer);
    }
    return layers;
  }

  return (
      <div className="overflow-auto">
        <h5 className="">Layers</h5>
        {renderLayers()}
      </div>
  );
};

export default LayersMenu;