import React, { useEffect, useState, useContext } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import ShapeMenu from '../ShapeMenu/ShapeMenu';
import TextMenu from '../TextMenu/TextMenu';
import ImageMenu from '../ImageMenu/ImageMenu';
import { EditorContext } from '../shared/context';
import { useSelector } from 'react-redux';
import { getDrawableZone } from '../shared/store/stage.reducer';

const SideMenu = ({stageRef}) => {
  const [toggledDrawer, setToggledDrawer] = useState('image');
  const editorContext = useContext(EditorContext);
  const drawableZone = useSelector(getDrawableZone);

  const exportRatio = 3;

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [toggledDrawer]);

  const handleExport = () => {
    const stagePos = stageRef?.current?.position();
    const scale = stageRef?.current?.scale();
    const x = (drawableZone.x) * scale.x + stagePos.x; // Define the x position of the part to export
    const y = (drawableZone.y) * scale.y + stagePos.y; // Define the y position of the part to export
    const width = drawableZone.width * scale.x; // Define the width of the part to export
    const height = drawableZone.height * scale.y; // Define the height of the part to export

    // Create a new canvas to draw the specified part
    const canvas = document.createElement('canvas');
    canvas.width = width * exportRatio;
    canvas.height = height * exportRatio;
    const context = canvas.getContext('2d');

    // Extract the part from the stage and draw it on the new canvas
    context.drawImage(
      stageRef?.current?.toCanvas({
        x,
        y,
        width,
        height,
        pixelRatio: exportRatio
      }),
      0, 0, canvas.width, canvas.width,
      0, 0, canvas.width, canvas.width
    );

    // Convert the new canvas to a data URL
    const dataURL = canvas.toDataURL('image/jpeg');

    // Create a link element to download the JPG file
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'exported-part.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <MDBBtn className={`p-3 ${toggledDrawer === 'template' ? 'btn-active' : ''}`}
                onClick={() => setToggledDrawer('template')}
                noRipple
        >
          <MDBIcon className="fs-2" fas icon="list-alt"/>
        </MDBBtn>
        <MDBBtn className={`p-3`}
                onClick={() => {
                  console.log(editorContext.elements)
                  handleExport();
                }}
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