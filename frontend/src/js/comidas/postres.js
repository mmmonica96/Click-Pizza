import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/postres.css";

export default function PostreApp() {
  const [cart, setCart] = useState([]);
  const [Postre, setPostre] = useState([]);
  const [selectedPostreForToppins, setSelectedPostreForToppins] =
    useState(null);
  const [extraToppins, setExtraToppins] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/Click-Pizza/backend/connection/controller.php?action=getPostres"
    )
      .then((res) => res.json())
      .then((data) => setPostre(data))
      .catch((err) => console.error("Error al cargar postres:", err));
  }, []);

  const availableToppins = [
    { id: 1, name: "Nata", price: 1.5 },
    { id: 2, name: "Nutella blanca", price: 2.0 },
    { id: 3, name: "Nutella", price: 1.0 },
  ];

  const toggletoppins = (toppins) => {
    if (extraToppins.find((i) => i.id === toppins.id)) {
      setExtraToppins(extraToppins.filter((i) => i.id !== toppins.id));
    } else {
      setExtraToppins([...extraToppins, toppins]);
    }
  };

  const addToCart = (postre, extras = []) => {
    const extrasNames = extras.map((e) => e.name).join(", ");
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);

    const postreWithExtras = {
      ...postre,
      name: extras.length ? `${postre.name} (+${extrasNames})` : postre.name,
      price: (parseFloat(postre.price) + extrasPrice).toFixed(2),
      extras: extras,
      type: "postre",
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...currentCart, postreWithExtras];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    alert(`${postreWithExtras.name} ¡añadida al carrito!`);
  };

  const handleAddToppinsClick = (postre) => {
    setSelectedPostreForToppins(postre);
    setExtraToppins([]);
  };

  const handleConfirmToppins = () => {
    if (selectedPostreForToppins) {
      addToCart(selectedPostreForToppins, extraToppins);
      setSelectedPostreForToppins(null);
      setExtraToppins([]);
    }
  };

  return (
    <div className="comida-container">
      {Postre.map((postre) => (
        <div
          key={postre.id}
          className="pizza-card p-4 flex flex-col items-center"
        >
          <img
            src={`/img/postres/${postre.img}`}
            alt={postre.name}
            className="imagen-postre"
          />
          <span className="pizza-name mb-2 text-center">{postre.name}</span>
          <span className="precio-texto">
            {Number(postre.price).toFixed(2)} €
          </span>

          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <button onClick={() => addToCart(postre)} className="btn btn-order">
              Pedir
            </button>
            <button
              onClick={() => handleAddToppinsClick(postre)}
              className="btn btn-ingredients"
            >
              Añadir toppings
            </button>
          </div>

          <div className="rating">
            <span>Opiniones</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= (postre.rating || 0) ? "star-filled" : "star-empty"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {selectedPostreForToppins && (
        <div
          className="modal-ingredients"
          onClick={() => setSelectedPostreForToppins(null)}
        >
          <div
            className="modal-ingredients-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Añadir ingredientes a {selectedPostreForToppins.name}</h3>
            <ul>
              {availableToppins.map((toppins) => (
                <li key={toppins.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={extraToppins.some((i) => i.id === toppins.id)}
                      onChange={() => toggletoppins(toppins)}
                    />
                    {toppins.name} (+{toppins.price.toFixed(2)} €)
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleConfirmToppins} className="btn btn-confirm">
              Añadir al carrito
            </button>
            <button
              onClick={() => setSelectedPostreForToppins(null)}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
