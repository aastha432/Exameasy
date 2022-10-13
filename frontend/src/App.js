import './App.css';
import Navbar from './Components/Navbar';
import landing_page from './Utilities/landing_page.jpg';
import React from 'react';
import { ImageList } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <img src={landing_page} height="100%" width="100%" alt='Landing page' />
    </div>
  );
}

export default App;
