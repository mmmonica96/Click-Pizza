import React, { useState } from "react";
import { motion } from "framer-motion";
import '../../css/create-pizza/pizzabuilder.css';

const ingredients = [
  { name: "Pepperoni", img: "/img/ingredientes/peperoni.png" },
  { name: "Champiñones", img: "/img/ingredientes/champiñones.png" },
  { name: "Pimiento", img: "/img/ingredientes/pimientos.png" },
  { name: "Aceitunas", img: "/img/ingredientes/aceitunas.png" },
  { name: "Queso extra", img: "/img/ingredientes/queso.png" },
];

export default function PizzaBuilder() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="pizza-builder">
      <h1 className="title">Crea tu Pizza</h1>

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

      <div className="ingredients-selector">
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.name}
            onClick={() => toggleIngredient(ingredient.name)}
            className={`ingredient-button ${
              selectedIngredients.includes(ingredient.name) ? "selected" : ""
            }`}
          >
            {ingredient.name}
          </button>
        ))}
      </div>
    </div>
  );
}