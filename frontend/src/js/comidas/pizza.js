import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";

export default function PizzaApp() {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzaForIngredients, setSelectedPizzaForIngredients] =
    useState(null);
  const [extraIngredients, setExtraIngredients] = useState([]);
  //fetch pizzas
  useEffect(() => {
    fetch(
      "http://localhost/Click-Pizza/backend/connection/controller.php?action=getPizzas"
    )
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Error al cargar pizzas:", err));
  }, []);
  //ingredients
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

    const pizzaWithExtras = {
      ...pizza,
      name: extras.length ? `${pizza.name} (+${extrasNames})` : pizza.name,
      price: (parseFloat(pizza.price) + extrasPrice).toFixed(2),
      extras: extras,
    };

    const updatedCart = [...cart, pizzaWithExtras];
    setCart(updatedCart);
    alert(`${pizzaWithExtras.name} ¡añadida al carrito!`);
  };
  //when the user clicks on add ingredients, a modal will appear
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
  //empty cart if you do not add ingredients
  const handleSaveOrder = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    //calculate the total
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    try {
      const res = await fetch(
        "http://localhost/Click-Pizza/backend/connection/controller.php?action=saveOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart, total }),
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        alert("Pedido guardado con éxito");
        setCart([]);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      alert("Error al enviar el pedido.");
    }
  };
  //displays the image and name of the pizza and the price
   return (
        <>
    <div className="center-button-container">
      <a href="/crear-pizza" className="center-button">
        Crea tu pizza 🍕
      </a>
    </div>

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
          <h4>Productos en carrito: {cart.length}</h4>
          <button onClick={handleSaveOrder} className="btn btn-confirm">
            Finalizar pedido
          </button>
        </div>
      )}
    </div>
    </>
  );
}
