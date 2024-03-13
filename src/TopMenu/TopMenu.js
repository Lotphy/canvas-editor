import React, {useEffect} from 'react';
import './TopMenu.css';
import {MDBBtn, MDBIcon, MDBInput, MDBRow} from "mdb-react-ui-kit";

const TopMenu = ({node, id}) => {
	useEffect(() => {
		// console.log(node.current.findOne(`#${id}`))

	}, [node, id]);

	const setFillColor = (e) => {
		const element = node.current?.findOne(`#${id}`);
		element.fill(e.target.value);
	}

	return (
		<div id="top-menu" className="bg-dark px-3 ">
			<div>
				<MDBBtn>
					<MDBIcon fas icon="palette"/>
				</MDBBtn>
				<MDBInput onChange={setFillColor}/>
			</div>
		</div>
	);
}

export default TopMenu;