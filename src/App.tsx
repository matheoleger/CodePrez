import React from "react";
import { NewPrez } from "./components/NewPrez";
import "./assets/css/App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Home } from "./components/Home";
import { Presentation } from "./components/Presentation";
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
            <HashRouter>
                <Routes>
                    <Route path="/" Component={SideBar}>
                        <Route path="/" Component={Home}></Route>
                        <Route path="/add" Component={NewPrez}></Route>
                    </Route>
                    <Route path="/prez" Component={Presentation}></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
