import React, { useState } from "react";
import { motion } from "framer-motion";
import "./PizzaBuilder.css";

const ingredients = [
  { name: "Pepperoni", img: "/images/pepperoni.png" },
  { name: "Champiñones", img: "/images/mushroom.png" },
  { name: "Pimiento", img: "/images/pepper.png" },
  { name: "Aceitunas", img: "/images/olive.png" },
  { name: "Queso extra", img: "/images/cheese.png" },
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
          src="/images/pizza-base.png"
          alt="Pizza base"
          className="pizza-base"
        />
        {selectedIngredients.map((name, index) => {
          const ing = ingredients.find((i) => i.name === name);
          return (
            <motion.img
              key={name}
              src={ing.img}
              alt={name}
              className="ingredient"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ top: `${20 + index * 10}px`, left: `${20 + index * 10}px` }}
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