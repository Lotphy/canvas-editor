import React, { useEffect, useState } from 'react';
import './AttrsMenu.css';
import TextAttributes from './TextAttributes';
import SquareAttributes from './SquareAttributes';
import CircleAttributes from './CircleAttributes';
import ImageAttributes from './ImageAttributes';
import { MDBInput } from 'mdb-react-ui-kit';

const AttrsMenu = ({ node, id, onChange }) => {
	const [element, setElement] = useState(null);

	useEffect(() => {
		const elm = node.current?.findOne(`#${id}`);
		setElement(elm);
	}, [node, id]);

	const updateAttribute = (type, value) => {
		element.setAttr(type, value);
		onChange({
			[type]: value
		})
	};

	const updateAttributes = (attrs) => {
		Object.keys(attrs).forEach(key => {
			element.setAttr(key, attrs[key]);
		});
		onChange({...attrs})
	};


	return (
		<div id="attrs-menu" className="d-flex align-items-center px-3">

			{id && (
				<div className="d-flex">
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
						<label className="me-2">X</label>
						<MDBInput
							className="text-white"
							type="number"
							value={Math.round(element?.attrs.relativeX)}
							onChange={(e) => {
								updateAttributes({
									relativeX : Math.round(+e.target.value)
								})
							}}
						/>
					</div>
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
						<label className="me-2">Y</label>
						<MDBInput
							className="text-white"
							type="number"
							value={Math.round(element?.attrs.relativeY)}
							onChange={(e) => {
								updateAttributes({
									relativeY : Math.round(+e.target.value)
								})
							}}
						/>
					</div>
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
						<label className="me-2">Width</label>
						<MDBInput
							className="text-white"
							type="number"
							value={element?.attrs.type === 'circle' ? Math.round(element?.attrs.radiusX) : element?.attrs.type === 'image' ? Math.round(element?.attrs.width * element?.attrs.scaleX) : Math.round(element?.attrs.width)}
							onChange={(e) => {
								let newVal = {};
								switch(element?.attrs.type) {
									case 'circle':
										newVal = {
											radiusX : Math.round(+e.target.value)
										};
										break;
									case 'rectangle':
									case 'text':
										newVal = {
											width : Math.round(+e.target.value)
										};
										break;
									case 'image':
										newVal = {
											scaleX : +e.target.value / element?.attrs.width
										};
										break;
								}
								updateAttributes(newVal);
							}}
						/>
					</div>
					<div className="text-white d-flex align-items-center bg-transparent shadow-0 px-0 me-3">
						<label className="me-2">Height</label>
						<MDBInput
							className="text-white"
							type="number"
							value={element?.attrs.type === 'circle' ? Math.round(element?.attrs.radiusY) : element?.attrs.type === 'image' ? Math.round(element?.attrs.height * element?.attrs.scaleY) : Math.round(element?.attrs.height)}
							onChange={(e) => {
								let newVal = {};
								switch(element?.attrs.type) {
									case 'circle':
										newVal = {
											radiusY : Math.round(+e.target.value)
										};
										break;
									case 'rectangle':
									case 'text':
										newVal = {
											height : Math.round(+e.target.value)
										};
										break;
									case 'image':
										newVal = {
											scaleY : +e.target.value / element?.attrs.height
										};
										break;
								}
								updateAttributes(newVal);
							}}
						/>
					</div>
					{element?.attrs.type === 'text' && <TextAttributes element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'rectangle' && <SquareAttributes  element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'circle' && <CircleAttributes  element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'image' && <ImageAttributes  element={element} updateAttributes={updateAttributes} />}
				</div>
			)}
		</div>
	);
};


export default AttrsMenu;
