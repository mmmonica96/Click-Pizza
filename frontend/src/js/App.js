// src/js/App.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import '../css/App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import PizzaApp from './pizza/pizza';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="App-main">
      <img
        src="/img/Ofertas.png"
        className="Banner-ofertas"
        alt="ofertas"
        onClick={() => navigate("/pizza")}
        style={{ cursor: "pointer" }}
      />
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-banner-container">
          <img src="/img/logo.png" className="App-logo" alt="logo" />
          <Banner />
        </div>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<PizzaApp />} />
      </Routes>
    </div>
  );
}

export default App;
