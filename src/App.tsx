import React from "react";
import { NewPrez } from "./components/NewPrez";
import "./assets/css/App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Home } from "./components/Home";
import { Presentation } from "./components/Presentation";
import { SlideViewer } from "./renderer/components/SlideViewer"
import "highlight.js/styles/github.css";

function App() {
    return (
        <div
            style={{
                backgroundColor: "#3A3939",
                width: "100%",
                height: "100%",
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
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
