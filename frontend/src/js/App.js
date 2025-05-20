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
import Login from "./login";
import Contact from "./contacto";
import CartModal from "./components/cartModal";
import PizzaBuilder from "./create-pizza/create-pizza";
import ShoppingBasket from "./components/shoppingBasket";
import Menus from "./main";

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
        <Route path="/cart" element={<CartModal />} />
        <Route path="/crear-pizza" element={<PizzaBuilder />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/carrito" element={<ShoppingBasket />} />
      </Routes>

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
