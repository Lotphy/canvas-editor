import React, { useEffect, useState } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import ShapeMenu from '../ShapeMenu/ShapeMenu';
import TextMenu from '../TextMenu/TextMenu';
import ImageMenu from '../ImageMenu/ImageMenu';

const SideMenu = () => {
  const [toggledDrawer, setToggledDrawer] = useState('image');

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [toggledDrawer])

  return (
    <div className="d-flex">
      <div id="options-selector" className="d-flex flex-column">
        <MDBBtn className={`p-3 ${toggledDrawer === 'layer' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('layer')}
        >
          <MDBIcon className="fs-2" fas icon="layer-group"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'text' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('text')}
        >
          <MDBIcon className="fs-2" fas icon="font"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'shape' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('shape')}
        >
          <MDBIcon className="fs-2" fas icon="shapes"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'image' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('image')}
        >
          <MDBIcon className="fs-2" fas icon="image"/>
        </MDBBtn>
      </div>
      {toggledDrawer !== '' &&
        <MDBContainer id="options-drawer" className="d-flex flex-column">
          <div className="h-100 overflow-auto">
            {toggledDrawer === 'layer' &&
              <LayersMenu/>
            }
            {toggledDrawer === 'text' &&
              <TextMenu/>
            }
            {toggledDrawer === 'shape' &&
              <ShapeMenu/>
            }
            {toggledDrawer === 'image' &&
              <ImageMenu/>
            }
          </div>
        </MDBContainer>
      }
    </div>
  );
};

export default SideMenu;