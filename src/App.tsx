import React from "react";
import "./styles/main.scss";
import { Header } from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Listing } from "./pages/listing/Listing";
import { Login } from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="pages shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
