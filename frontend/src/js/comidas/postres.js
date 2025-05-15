import { useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";

export default function PostreApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
    alert(`${pizza.name} ¡añadida al carrito!`);
  };

  const pizzas = [
    { id: 1, name: "Tiramisu", rating: 3, price: 12.99, image: "../img/postres/tiramisu.jpg" },
    { id: 2, name: "Helado de Vainilla", rating: 4, price: 14.99, image: "../img/postres/helado_vainilla.jpg" },
    { id: 3, name: "Flan de huevo", rating: 3, price: 13.99, image: "../img/postres/flan.jpg" },
    { id: 4, name: "Tarta de Queso", rating: 5, price: 16.99, image: "../img/postres/tarta_queso.jpg" },
  ];

  return (
    <div className="comida-container">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card p-4 flex flex-col items-center">
            {/* Imagen */}
            <img
              src={pizza.image}
              alt={pizza.name}
              className="imagen-pizza"
            />

            {/* Nombre */}
            <span className="pizza-name mb-2 text-center">{pizza.name}</span>

            {/* Botones */}
            <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
              <button
                onClick={() => addToCart(pizza)}
                className="btn btn-order"
              >
                Pedir
              </button>

              {pizza.id  && (
                <button className="btn btn-ingredients">
                  Añadir ingredientes
                </button>
              )}
            </div>

            {/* Opiniones */}
            <div className="rating">
              <span>Opiniones</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= pizza.rating ? "star-filled" : "star-empty"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}
