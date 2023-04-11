import React, { useEffect } from 'react';
import { NewPrez } from './renderer/pages/NewPrez';
import './assets/css/App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SideBar } from './renderer/components/SideBar';
import { Home } from './renderer/pages/Home';
import { Presentation } from './renderer/pages/Presentation';
import { SlideViewer } from './renderer/pages/SlideViewer';
import 'highlight.js/styles/github.css';
import { DualScreen } from './renderer/pages/DualScreen';

function App() {
  useEffect(() => {
    document.title = 'CodePrez';
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#3A3939',
        width: '100%',
        height: '100%',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <HashRouter>
        <Routes>
          <Route path="/" Component={SideBar}>
            <Route path="/" Component={Home}></Route>
            <Route path="/add" Component={NewPrez}></Route>
            <Route path="/prez" Component={Presentation}></Route>
          </Route>
          <Route path="/viewer" Component={SlideViewer}></Route>
          <Route path="/dualScreen" Component={DualScreen}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
