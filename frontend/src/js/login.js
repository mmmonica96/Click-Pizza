import { useState } from 'react';
import './login.css'; 

export default function login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inicio de sesión:', formData);
    setEnviado(true);
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="login-App">
      <main className="login-container">
        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Inicia Sesión</h2>

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Entrar</button>

          {enviado && <p className="success-message">¡Inicio de sesión exitoso!</p>}
        </form>
      </main>

      <footer className="login-footer">
        © 2025 Click & Pizza - Bienvenido de nuevo
      </footer>
    </div>
  );
}
