import React, { useEffect, useState } from 'react';
import './AttrsMenu.css';
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";

const AttrsMenu = ({ node, id }) => {
	const [element, setElement] = useState(null);
	const [strokeWidth, setStrokeWidth] = useState(0);
	const [cornerRadius, setCornerRadius] = useState(0);

	useEffect(() => {
		const elm = node.current?.findOne(`#${id}`);
		setElement(elm);
	}, [node, id]);

	useEffect(() => {
		if (element) {
			// Update input values whenever element attributes change
			setStrokeWidth(element.attrs.strokeWidth || 0);
			setCornerRadius(element.attrs.cornerRadius || 0);
		}
	}, [element]);

	const updateAttribute = (type, value) => {
		element.setAttr(type, value);
	};

	return (
		<div id="attrs-menu" className="bg-dark px-3 d-flex align-items-center">
			{id && (
				<div className="d-flex">
					<MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
						<label className="me-2">Stroke:</label>
						<MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{color: element?.attrs?.stroke}}/>
					</MDBBtn>
					<MDBBtn className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
						<label className="me-2">Background:</label>
						<MDBIcon fas icon="square" size="lg" className="d-inline-block" style={{color: element?.attrs?.fill}}/>
					</MDBBtn>
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
						<label className="me-2">Width:</label>
						<MDBInput
							className="text-white"
							type="number"
							value={strokeWidth}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								setStrokeWidth(value);
								updateAttribute('strokeWidth', value);
							}}
						/>
					</div>
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-3">
						<label className="me-2">Corner:</label>
						<MDBInput
							className="text-white"
							type="number"
							value={cornerRadius}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								setCornerRadius(value);
								updateAttribute('cornerRadius', value);
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AttrsMenu;
