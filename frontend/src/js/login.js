import { useState } from 'react';
import '../css/login/login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviado(false);

    try {
      const response = await fetch("http://localhost/Click-Pizza/backend/php/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (result.success) {
        setUsuario(result.user);
        setEnviado(true);
        setFormData({ email: '', password: '' });
      } else {
        setError(result.message || "Error en el inicio de sesión");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-App">
      <main className="login-container">
        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="titulo">Inicia Sesión</h2>

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <button type="submit">Entrar</button>

          {enviado && usuario && (
            <p className="success-message">¡Bienvenido/a, {usuario.name}!</p>
          )}
          {error && (
            <p className="error-message">{error}</p>
          )}
        </form>
      </main>
    </div>
  );
}