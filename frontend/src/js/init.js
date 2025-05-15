import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/init.css";
import "../css/app.css";
// import qrImage from "./img/carrito.png";

const promotions = [
  {
    id: 1,
    title: "elTriple",
    description: "3 pizzas medianas\n+2 bebidas de 1L",
    price: "12,45€",
    image: "/img/ofertaUno.jpg",
  },
  {
    id: 2,
    title: "Tarrina Häagen-Dazs (460 ml)",
    price: "4,25€",
    image: "/img/ofertaDos.jpeg",
  },
  {
    id: 3,
    title: "Family days",
    description: "Familiares A\nLocal y recoge",
    price: "6,95€",
    image: "/img/ofertaTres.png",
  },
  {
    id: 4,
    title: "Maestros de la pizza",
    description: "Oferta de 2x1 en pizzas",
    price: "2x1",
    image: "/img/ofertaCuatro.png",
  },
];

//promotions
function Promotions() {
  return (
    <div className="ofertas-container">
      {promotions.map((promo) => (
        <div className="oferta-card" key={promo.id}>
          <img src={promo.image} alt={promo.title} className="oferta-img" />
          <div className="oferta-info">
            <h3>{promo.title}</h3>
            {promo.description && <p>{promo.description}</p>}
            <span className="oferta-precio">{promo.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

//home and banner with url
function Home() {
  const navigate = useNavigate();

  return (
    <main className="app-main">
      <img
        src="/img/ofertas.png"
        className="Banner-ofertas"
        alt="ofertas"
        onClick={() => navigate("/pizza")}
        style={{ cursor: "pointer", marginBottom: "2rem" }}
      />
      <Promotions />
    </main>
  );
}

export default Home;
