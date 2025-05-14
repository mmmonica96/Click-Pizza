// src/js/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "../css/app.css";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import PizzaApp from "./pizza/pizza";
import { Link } from "react-router-dom";

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
          <Link to="/pizza/pizza">
            <img src="/img/logo.png" className="App-logo" alt="logo" />
          </Link>
          <Banner />
        </div>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/pizza" element={<PizzaApp />} />
      </Routes>
    </div>
  );
}

export default App;
