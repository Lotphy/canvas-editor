import React, { useContext, useEffect } from 'react';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { TEMPLATES } from '../shared/constants';
import { EditorContext } from '../shared/context';

const TemplateMenu = () => {
  const editorContext = useContext(EditorContext);

  useEffect(() => {
  }, []);

  const handleAddElement = (elements) => {
    editorContext.setElements(elements);
  };

  const renderImages = () => {
    const renderer = [];
    TEMPLATES.forEach((template, index) => {
      renderer.push(
        <MDBCol className={`col-6 mb-3`} key={index} onClick={() => handleAddElement(template.elements)}>
          <img src={`${process.env.PUBLIC_URL}/assets/samples/templates/${template.src}`} alt="Template" className={`template-${index} mw-100`} />
        </MDBCol>
      )
    })
    return renderer;
  }

  return (
    <div>
      <MDBRow className="image-menu d-flex m-0">
        {renderImages()}
      </MDBRow>
    </div>
  );
};

export default TemplateMenu;
