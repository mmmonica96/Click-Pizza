import React, { useState } from "react";
import "../../css/register/registerform.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando:", { name, email, password });

    try {
      //fetch
      const response = await fetch(
        "http://localhost/click-pizza/backend/php/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const text = await response.text();
      console.log("Respuesta RAW:", text);

      let data;
      //if the data is sent well, send a json
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error de JSON:", jsonError);
        setMensaje("Respuesta inesperada del servidor.");
        return;
      }
      //sends a message if the data has been sent correctly
      if (data.success) {
        setMensaje("Usuario registrado correctamente.");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setMensaje("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default RegisterForm;
