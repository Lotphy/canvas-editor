import React  from 'react';
import './TopMenu.css';

const TopMenu = ({ element }) => {
  return <div>{element?.type}</div>
}

export default TopMenu;