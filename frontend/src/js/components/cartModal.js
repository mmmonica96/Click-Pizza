import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";
import "../../css/cart.css";

export default function PizzaApp() {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzaForIngredients, setSelectedPizzaForIngredients] =
    useState(null);
  const [extraIngredients, setExtraIngredients] = useState([]);
  //fetch
  useEffect(() => {
    fetch(
      "http://localhost/Click-Pizza/backend/connection/controller.php?action=getPizzas"
    )
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Error al cargar pizzas:", err));
  }, []);
  <ul className="ingredientes-lista">
    {availableIngredients.map((ingredient) => (
      <li key={ingredient.id} className="ingrediente-item">
        <label className="ingrediente-label">
          <input
            type="checkbox"
            checked={extraIngredients.some((i) => i.id === ingredient.id)}
            onChange={() => toggleIngredient(ingredient)}
            className="ingrediente-checkbox"
          />
          <span className="ingrediente-nombre">
            {ingredient.name} (+{ingredient.price.toFixed(2)} €)
          </span>
        </label>
      </li>
    ))}
  </ul>;

  const availableIngredients = [
    { id: 1, name: "Queso extra", price: 1.5 },
    { id: 2, name: "Jamón", price: 2.0 },
    { id: 3, name: "Champiñones", price: 1.0 },
  ];

  const toggleIngredient = (ingredient) => {
    if (extraIngredients.find((i) => i.id === ingredient.id)) {
      setExtraIngredients(
        extraIngredients.filter((i) => i.id !== ingredient.id)
      );
    } else {
      setExtraIngredients([...extraIngredients, ingredient]);
    }
  };
  //add to cart
  const addToCart = (pizza, extras = []) => {
    const extrasNames = extras.map((e) => e.name).join(", ");
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    //...is a js operator in which all properties are included.
    const pizzaWithExtras = {
      ...pizza,
      name: extras.length ? `${pizza.name} (+${extrasNames})` : pizza.name,
      price: (parseFloat(pizza.price) + extrasPrice).toFixed(2),
      extras: extras,
    };

    const updatedCart = [...cart, pizzaWithExtras];
    setCart(updatedCart);
    localStorage.setItem("pizzaCart", JSON.stringify(updatedCart));
    alert(`${pizzaWithExtras.name} ¡añadida al carrito!`);
  };
  //selected pizz for ingredients
  const handleAddIngredientsClick = (pizza) => {
    setSelectedPizzaForIngredients(pizza);
    setExtraIngredients([]);
  };
  //confirm ingredients
  const handleConfirmIngredients = () => {
    if (selectedPizzaForIngredients) {
      addToCart(selectedPizzaForIngredients, extraIngredients);
      setSelectedPizzaForIngredients(null);
      setExtraIngredients([]);
    }
  };
  //save order
  const handleSaveOrder = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    try {
      const response = await fetch(
        "http://localhost/Click-Pizza/backend/connection/controller.php?action=saveOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart, total }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("Pedido guardado con éxito");
        setCart([]);
        localStorage.removeItem("pizzaCart");
      } else {
        alert("Error al guardar el pedido: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      alert("No se pudo guardar el pedido.");
    }
  };
  //map allows you to scroll through the pizza toppings
  return (
    <div className="comida-container">
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="pizza-card p-4 flex flex-col items-center"
        >
          <img
            src={`/img/pizzas/${pizza.img}`}
            alt={pizza.name}
            className="imagen-pizza"
          />
          <span className="pizza-name mb-2 text-center">{pizza.name}</span>
          <span className="precio-texto">
            {Number(pizza.price).toFixed(2)} €
          </span>

          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <button onClick={() => addToCart(pizza)} className="btn btn-order">
              Pedir
            </button>
            <button
              onClick={() => handleAddIngredientsClick(pizza)}
              className="btn btn-ingredients"
            >
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
                  className={
                    star <= (pizza.rating || 0) ? "star-filled" : "star-empty"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* modal for adding ingredients */}
      {selectedPizzaForIngredients && (
        <div
          className="modal-ingredients"
          onClick={() => setSelectedPizzaForIngredients(null)}
        >
          <div
            className="modal-ingredients-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Añadir ingredientes a {selectedPizzaForIngredients.name}</h3>
            <ul>
              {availableIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={extraIngredients.some(
                        (i) => i.id === ingredient.id
                      )}
                      onChange={() => toggleIngredient(ingredient)}
                    />
                    {ingredient.name} (+{ingredient.price.toFixed(2)} €)
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleConfirmIngredients}
              className="btn btn-confirm"
            >
              Añadir al carrito
            </button>
            <button
              onClick={() => setSelectedPizzaForIngredients(null)}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="finalizar-pedido">
          <h4>Productos en el carrito: {cart.length}</h4>
          <button className="btn btn-confirm" onClick={handleSaveOrder}>
            Finalizar pedido
          </button>
        </div>
      )}
    </div>
  );
}
