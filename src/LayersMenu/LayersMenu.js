import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './LayersMenu.css';
import { useSelector } from 'react-redux';
import { getStageElements } from '../shared/store/stage.reducer';

const LayersMenu = () => {
  const [elements, setElements] = useState([]);
  const storeElements = useSelector(getStageElements);

  useEffect(() => {
    setElements(storeElements);
  }, [storeElements])

  const onDeleteLayer = (e, id) => {
    e.stopPropagation();
    document.dispatchEvent(new CustomEvent('deleteElementById', { detail: { id } }));
  }

  const renderLayers = () => {
    const layers = [];
    for (let i = elements?.length - 1; i >= 0; i--) {
      const elem = elements[i];
      const layer = (
        <MDBRow className="layer-row mb-2 mx-0" key={elem.id} onClick={() => {
          document.dispatchEvent(new CustomEvent('getElementById', { detail: { id: elem.id } }));
        }}>

          <MDBCol className="layer-cell col-1 p-0">
            <div className="depth-setters h-100">
              <MDBBtn className="p-0 icon-btn h-50" color="tertiary"
                      onClick={(e) => {
                      }}
                      noRipple
              >
                <MDBIcon fas icon="caret-up" size="1x"/>
              </MDBBtn>
              <MDBBtn className="p-0 icon-btn h-50" color="tertiary"
                      onClick={(e) => {
                      }}
                      noRipple
              >
                <MDBIcon fas icon="caret-down" size="1x"/>
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol className="layer-cell col-3">
            <span className="d-inline-block">
              {
                (elem.type === 'rectangle' ||
                  elem.type === 'circle' ||
                  elem.type === 'svg') &&
                <span>Shape</span>
              }
              {
                elem.type === 'text' &&
                <span>Text</span>
              }
              {
                elem.type === 'image' &&
                <span>Image</span>
              }
            </span>
          </MDBCol>
          <MDBCol className="layer-cell col-4">
            <span className="d-inline-block">{elem.type === 'text' ? elem.text : elem.id}</span>
          </MDBCol>
          <MDBCol className="layer-cell col-4 align-items-end flex-column pe-1 py-1 h-100">
            <div className="d-flex align-items-center h-100">
              <MDBBtn className="h-100 px-2 py-0 icon-btn" color="tertiary" onClick={(e) => {
              }} noRipple>
                <MDBIcon fas icon="lock" size="1x"/>
              </MDBBtn>
              <MDBBtn className="h-100 px-2 py-0 icon-btn" color="tertiary" onClick={(e) => {
              }} noRipple>
                <MDBIcon fas icon="eye" size="1x"/>
              </MDBBtn>
              <MDBBtn className="h-100 px-2 py-0 icon-btn" color="tertiary" onClick={(e) => {
              }} noRipple>
                <MDBIcon fas icon="trash" size="1x"/>
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>);
      layers.push(layer);
    }
    return layers;
  }

  return (
    <div className="overflow-auto">
      {renderLayers()}
    </div>
  );
};

export default LayersMenu;