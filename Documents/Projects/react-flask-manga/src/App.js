import React, { useState, useEffect } from 'react';
import {StyleReset} from 'atomize';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './pages/home'
import Browse from './pages/browse';
import Details from './pages/mangadetails';
import Reader from './pages/reader';
import Banner from './components/banner';
import { Div } from 'atomize';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
    <StyleReset />
    
      <Div>
      <Router>
      <Div overflow="hidden">
      <Navbar/></Div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/browse" element={<Browse/>}/>
                <Route path="/mangaDetails" element={<Details/>}/>
                <Route path="/reader" element={<Reader/>}/>
            </Routes>
        </Router>
        <Div bg="gray200"
        d="flex"
        justify="space-around"
        align="center"
        p="2rem"
        bottom="0"
        w="100vw"
        position="fixed"
        >


        <Banner Infos="Designed by Zhe Fan"/></Div>
        <Div/>
      
      </Div>
      
    </>
    
  );
}

export default App;