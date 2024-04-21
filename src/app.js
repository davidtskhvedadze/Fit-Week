import React, {useState, useHook} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={<LoginPage />} // Add LoginPage route
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
