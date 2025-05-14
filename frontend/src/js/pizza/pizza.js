import { useState } from "react";
import { Star } from "lucide-react";
export default function PizzaApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
    alert(`${pizza.name} ¡añadida al carrito!`);
  };

  const pizzas = [
    { id: 1, name: "Pizza1", rating: 3, price: 12.99 },
    { id: 2, name: "Pizza2", rating: 4, price: 14.99 },
    { id: 3, name: "Pizza3", rating: 3, price: 13.99 },
    { id: 4, name: "Pizza4", rating: 5, price: 16.99 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-amber-50 rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-32 h-32 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-800">
                      {pizza.name}
                    </span>
                  </div>

                  <div className="w-full flex justify-between">
                    <button
                      onClick={() => addToCart(pizza)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded"
                    >
                      Pedir
                    </button>

                    {pizza.id === 1 && (
                      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-2 rounded text-sm">
                        Añadir ingredientes
                      </button>
                    )}
                  </div>

                  <div className="mt-4 w-full">
                    <div className="bg-orange-400 text-white px-4 py-1 rounded flex items-center">
                      <span>Opiniones</span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            fill={star <= pizza.rating ? "gold" : "gray"}
                            stroke={star <= pizza.rating ? "gold" : "gray"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-100 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-amber-800">
            © 2025 Click & Pizza - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
