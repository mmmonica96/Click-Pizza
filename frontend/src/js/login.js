import { useState } from 'react';
import '../css/login/login.css'; 

export default function Login() {
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

          {enviado && <p className="success-message">¡Inicio de sesión exitoso!</p>}
        </form>
      </main>
    </div>
  );
}