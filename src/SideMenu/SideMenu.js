import React, { useEffect, useState } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';

const SideMenu = () => {
  const [toggledDrawer, setToggledDrawer] = useState('');

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [toggledDrawer])

  return (
    <div id="drawer" className="d-flex">
      <div className="d-flex flex-column">
        <MDBBtn color={toggledDrawer === 'layer' ? 'warning' : 'dark'}
                className="py-2 px-3"
                onClick={() => setToggledDrawer('layer')}
        >
          <span className="flaticon-037-full-screen fs-2" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'text' ? 'warning' : 'dark'}
                className="py-2 px-3"
                onClick={() => setToggledDrawer('text')}
        >
          <span className="flaticon-046-font fs-2" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'shape' ? 'warning' : 'dark'}
                className="py-2 px-3"
                onClick={() => setToggledDrawer('shape')}
        >
          <span className="flaticon-003-geometrical-shapes fs-2" />
        </MDBBtn>
        <MDBBtn color={toggledDrawer === 'image' ? 'warning' : 'dark'}
                className="py-2 px-3"
                onClick={() => setToggledDrawer('image')}
        >
          <span className="flaticon-018-photo-gallery fs-2" />
        </MDBBtn>
      </div>
      {toggledDrawer === 'shape' && <LayersMenu />}
    </div>
  );
};

export default SideMenu;