import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../css/create-pizza/pizzabuilder.css";
import pizzaData from "../../json/pizzaData.json";

const ingredients = pizzaData.ingredients;
const bases = pizzaData.bases;

export default function PizzaBuilder() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const calculateTotal = () => {
    const ingredientsTotal = selectedIngredients.reduce((sum, name) => {
      const ing = ingredients.find((i) => i.name === name);
      return sum + (ing?.price || 0);
    }, 0);
    const basePrice = bases.find((b) => b.name === selectedBase)?.price || 0;
    return (ingredientsTotal + basePrice).toFixed(2);
  };

  const addToCart = () => {
    if (!selectedBase) {
      alert("Por favor, selecciona una base para tu pizza.");
      return;
    }
    const pizza = {
      base: selectedBase,
      ingredients: selectedIngredients,
      total: calculateTotal(),
    };
    // Aquí puedes enviar `pizza` a un contexto de carrito, una API, etc.
    console.log("Pizza añadida al carrito:", pizza);
    alert("¡Tu pizza ha sido añadida al carrito!");
  };

  return (
    <div className="pizza-builder">
      <h1 className="title">Crea tu pizza</h1>

      <div className="pizza-container">
        <img
          src="/img/ingredientes/base-masa.png"
          alt="Pizza base"
          className="pizza-base"
        />
        {selectedIngredients.map((name) => {
          const ing = ingredients.find((i) => i.name === name);
          return (
            <motion.img
              key={name}
              src={ing.img}
              alt={name}
              className="ingredient"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          );
        })}
      </div>

      <div className="base-selector">
        <h2>Selecciona tu base:</h2>
        {bases.map((base) => (
          <button
            key={base.name}
            onClick={() => setSelectedBase(base.name)}
            className={`base-button ${
              selectedBase === base.name ? "selected" : ""
            }`}
          >
            {base.name} (+€{base.price})
          </button>
        ))}
      </div>

      <div className="ingredients-selector">
        <h2>Ingredientes:</h2>
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.name}
            onClick={() => toggleIngredient(ingredient.name)}
            className={`ingredient-button ${
              selectedIngredients.includes(ingredient.name) ? "selected" : ""
            }`}
          >
            {ingredient.name} (+€{ingredient.price})
          </button>
        ))}
      </div>

      <div className="total-price">
        <h2>Total: €{calculateTotal()}</h2>
      </div>

      <div className="add-to-cart">
        <button className="add-to-cart-button" onClick={addToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
