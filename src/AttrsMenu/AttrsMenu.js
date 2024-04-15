import React, { useEffect, useState } from 'react';
import './AttrsMenu.css';
import TextAttributes from './TextAttributes';
import SquareAttributes from './SquareAttributes';
import CircleAttributes from './CircleAttributes';
import { useDispatch } from 'react-redux';
import { updateElement } from '../shared/store/stage.reducer';

const AttrsMenu = ({ node, id, onChange }) => {
	const [element, setElement] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const elm = node.current?.findOne(`#${id}`);
		setElement(elm);
	}, [node, id]);

	const updateAttribute = (type, value) => {
		element.setAttr(type, value);
		onChange({
			[type]: value
		})
		// dispatch(updateElement({
		// 	element
		// }))
	};


	return (
		<div id="attrs-menu" className="px-3 d-flex align-items-center">
			{id && (
				<div className="d-flex">
					{element?.attrs.type === 'text' && <TextAttributes element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'rectangle' && <SquareAttributes  element={element} updateAttribute={updateAttribute} />}
					{element?.attrs.type === 'circle' && <CircleAttributes  element={element} updateAttribute={updateAttribute} />}
				</div>
			)}
		</div>
	);
};


export default AttrsMenu;
