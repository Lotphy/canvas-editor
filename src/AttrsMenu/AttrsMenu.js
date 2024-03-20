import React, { useEffect, useState } from 'react';
import './AttrsMenu.css';
import TextAttributes from './TextAttributes';
import SquareAttributes from './SquareAttributes';

const AttrsMenu = ({ node, id }) => {
	const [element, setElement] = useState(null);

	useEffect(() => {
		const elm = node.current?.findOne(`#${id}`);
		setElement(elm);
	}, [node, id]);

	const updateAttribute = (type, value) => {
		element.setAttr(type, value);
	};


	return (
		<div id="attrs-menu" className="px-3 d-flex align-items-center">
			{id && (
				<div className="d-flex">
					{element?.attrs.type === 'text' && <TextAttributes element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'rectangle' && <SquareAttributes  element={element} updateAttribute={updateAttribute} />}
				</div>
			)}
		</div>
	);
};


export default AttrsMenu;
