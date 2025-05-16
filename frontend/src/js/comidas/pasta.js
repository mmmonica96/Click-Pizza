import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";

export default function PastaApp() {
  const [cart, setCart] = useState([]);
  const [pastas, setPastas] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Click-Pizza/backend/connection/controller.php?action=getPastas")
      .then((res) => res.json())
      .then((data) => setPastas(data))
      .catch((err) => console.error("Error al cargar pastas:", err));
  }, []);

  const addToCart = (producto) => {
    setCart([...cart, producto]);
    alert(`${producto.name} ¡añadida al carrito!`);
  };

  return (
    <div className="comida-container">
      {pastas.map((producto) => (
        <div key={producto.id} className="pizza-card p-4 flex flex-col items-center">
          <img
            src={`/img/pasta/${producto.img}`}
            alt={producto.name}
            className="imagen-pizza"
          />
          <span className="pizza-name mb-2 text-center">{producto.name}</span>

          {/* Precio */}
          <span className="precio-texto">
            {Number(producto.price).toFixed(2)} €
          </span>


          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <button
              onClick={() => addToCart(producto)}
              className="btn btn-order"
            >
              Pedir
            </button>

            <button className="btn btn-ingredients">
              Añadir ingredientes
            </button>
          </div>

          <div className="rating">
            <span>Opiniones</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= (producto.rating || 0) ? "star-filled" : "star-empty"}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
