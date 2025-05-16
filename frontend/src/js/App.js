import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/app.css";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import PizzaApp from "./comidas/pizza";
import Footer from "./components/footer";
import RegisterForm from "./register/registerform";
import EntrantesApp from "./comidas/entrantes";
import PastaApp from "./comidas/pasta";
import PostreApp from "./comidas/postres";
import Home from "./init";
import Contact from "./contacto";
import Login from "./login";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-banner-container">
          <Link to="/pizza">
            <img src="/img/logo.png" className="App-logo" alt="logo" />
          </Link>
          <Banner />
        </div>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<PizzaApp />} />
        <Route path="/entrantes" element={<EntrantesApp />} />
        <Route path="/pasta" element={<PastaApp />} />
        <Route path="/postres" element={<PostreApp />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
