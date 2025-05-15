import { useState } from 'react';
import '../css/contacto.css'; 

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    comentario: '',
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
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', email: '', comentario: '' });
  };

  return (
    <div className="OpinionForm-App">
      <main className="opinion-container">
        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Déjanos tu opinión</h2>

          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Comentario</label>
          <textarea
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit">Enviar Opinión</button>

          {enviado && <p className="success-message">¡Gracias por tu opinión!</p>}
        </form>
      </main>

      <footer className="OpinionForm-footer">
        © 2025 Click & Pizza - Valoramos tu opinión
      </footer>
    </div>
  );
}
