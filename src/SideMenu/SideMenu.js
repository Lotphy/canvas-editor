import React, { useEffect, useState } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import ShapeMenu from '../ShapeMenu/ShapeMenu';
import TextMenu from '../TextMenu/TextMenu';

const SideMenu = () => {
  const [toggledDrawer, setToggledDrawer] = useState('');

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [toggledDrawer])

  return (
    <div className="d-flex">
      <div id="options-selector" className="d-flex flex-column">
        <MDBBtn color={toggledDrawer === 'layer' ? 'primary' : 'dark'}
                className="p-3"
                onClick={() => setToggledDrawer('layer')}
        >
          <MDBIcon className="fs-2" fas icon="layer-group" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'text' ? 'primary' : 'dark'}
                className="p-3"
                onClick={() => setToggledDrawer('text')}
        >
          <MDBIcon className="fs-2" fas icon="font" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'shape' ? 'primary' : 'dark'}
                className="p-3"
                onClick={() => setToggledDrawer('shape')}
        >
          <MDBIcon className="fs-2" fas icon="shapes" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'image' ? 'primary' : 'dark'}
                className="p-3"
                onClick={() => setToggledDrawer('image')}
        >
          <MDBIcon className="fs-2" fas icon="image" />
        </MDBBtn>
      </div>
      {toggledDrawer !== '' &&
        <div id="options-drawer" className="d-flex flex-column">
          {toggledDrawer === 'layer' &&
            <LayersMenu />
          }
          {toggledDrawer === 'text' &&
            <TextMenu />
          }
          {toggledDrawer === 'shape' &&
            <ShapeMenu />
          }
          {toggledDrawer === 'image' &&
            <div>IMG</div>
          }
        </div>
      }
    </div>
  );
};

export default SideMenu;