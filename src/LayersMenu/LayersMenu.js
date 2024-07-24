import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import './LayersMenu.css';
import { useContext } from 'react';
import EditorContext from '../shared/EditorContext';

const LayersMenu = () => {
  const editorContext = useContext(EditorContext);

  const onDeleteLayer = (e, id) => {
    e.stopPropagation();
    editorContext.deleteElementById(id);
  }

  const cloneLayer = (e, index) => {
    e.stopPropagation();
    const cloneId = crypto.randomUUID();
    const cloneData = {
      id: cloneId,
      relativeX: editorContext.elements[index].relativeX + 20,
      relativeY: editorContext.elements[index].relativeY + 20,
    };
    editorContext.cloneElementAtIndex(index, cloneData);
  }

  const raiseZIndex = (e, index) => {
    e.stopPropagation();
    if (index < editorContext.elements.length) {
      const elems = JSON.parse(JSON.stringify(editorContext.elements));
      const elemsToSwap = editorContext.elements.slice(index, index + 2);
      elemsToSwap.reverse();
      elems.splice(index, 2, ...elemsToSwap);
      editorContext.setElements(elems);
    }
  }

  const lowerZIndex = (e, index) => {
    e.stopPropagation();
    if (index > 0) {
      const elemsToSwap = editorContext.elements.slice(index - 1, index + 1).reverse();
      const elems = Array.from(editorContext.elements);
      elems.splice(index - 1, 2, ...elemsToSwap);
      editorContext.setElements(elems);
    }
  }

  const renderLayers = () => {
    const layers = [];
    for (let index = editorContext.elements?.length - 1; index >= 0; index--) {
      const elem = editorContext.elements[index];
      const layer = (
        <MDBRow className={`layer-row mb-2 mx-0 ${editorContext?.selectedElement?.id === elem.id && 'selected'}`}
                key={index}
                onClick={() => {
                  editorContext.setSelectedElement(elem);
                }}
        >
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
              <MDBBtn className="h-100 px-2 py-0 icon-btn"
                      color="tertiary"
                      onClick={(e) => {
                        onDeleteLayer(e, elem.id);
                      }}
                      noRipple>
                <MDBIcon fas icon="trash" size="1x"/>
              </MDBBtn>
              <MDBBtn className="h-100 px-2 py-0 icon-btn"
                      color="tertiary"
                      onClick={(e) => {
                        cloneLayer(e, index);
                      }}
                      noRipple
              >
                <MDBIcon fas icon="clone" size="1x"/>
              </MDBBtn>
              <MDBBtn className="h-100 px-2 py-0 icon-btn" color="tertiary" onClick={(e) => {
              }} noRipple>
                <MDBIcon fas icon="eye" size="1x"/>
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol className="layer-cell col-1 p-0">
            <div className="depth-setters h-100">
              <MDBBtn className="p-0 icon-btn h-50" color="tertiary"
                      disabled={index + 2 > editorContext.elements.length}
                      onClick={(e) => {
                        raiseZIndex(e, index);
                      }}
                      noRipple
              >
                <MDBIcon fas icon="caret-up" size="1x"/>
              </MDBBtn>
              <MDBBtn className="p-0 icon-btn h-50" color="tertiary"
                      disabled={index <= 0}
                      onClick={(e) => {
                        lowerZIndex(e, index);
                      }}
                      noRipple
              >
                <MDBIcon fas icon="caret-down" size="1x"/>
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