import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/init.css";
import "../css/app.css";
function Home() {
  const navigate = useNavigate();

  return (
    <main className="app-main">
      <img
        src="../img/otros/ofertas.png"
        className="Banner-ofertas"
        alt="ofertas"
        onClick={() => navigate("/pizza")}
        style={{ cursor: "pointer" }}
      />
    </main>
  );
}

export default Home;
