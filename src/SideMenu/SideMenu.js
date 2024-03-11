import React, { useState } from 'react';
import './SideMenu.css';
import LayersMenu from '../LayersMenu/LayersMenu';

const SideMenu = () => {
  const [elements, setElements] = useState([]);

  return (<LayersMenu />);
};

export default SideMenu;