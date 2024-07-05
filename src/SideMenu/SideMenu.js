import React, { useEffect, useState, useContext } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import ShapeMenu from '../ShapeMenu/ShapeMenu';
import TextMenu from '../TextMenu/TextMenu';
import ImageMenu from '../ImageMenu/ImageMenu';
import { EditorContext } from '../shared/context';

const SideMenu = () => {
  const [toggledDrawer, setToggledDrawer] = useState('image');
  const editorContext = useContext(EditorContext);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [toggledDrawer])

  return (
    <div className="d-flex">
      <div id="options-selector" className="d-flex flex-column">
        <MDBBtn className={`p-3 ${toggledDrawer === 'layer' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('layer')}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="layer-group"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'text' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('text')}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="font"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'shape' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('shape')}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="shapes"/>
        </MDBBtn>
        <MDBBtn className={`p-3 ${toggledDrawer === 'image' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('image')}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="image"/>
        </MDBBtn>
        <MDBBtn className={`p-3`}
                onClick={() => console.log(editorContext.elements)}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="download"/>
        </MDBBtn>
      </div>
      {toggledDrawer !== '' &&
        <MDBContainer id="options-drawer" className="d-flex flex-column">
          <MDBBtn className="drawer-toggler shadow-0" noRipple onClick={() => setToggledDrawer('')}>
            <MDBIcon fas icon="caret-left" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 96" width="13" height="96" fill="none"
                 className="IrLwCg">
              <path className="QSQMjg" d="M0,0 h1 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32 H0 z"></path>
              <path className="TjrBvg" d="M0.5,0 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32"></path>
            </svg>
          </MDBBtn>
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