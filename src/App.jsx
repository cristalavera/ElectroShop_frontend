import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoComponent from './components/ProductoComponent';

function App() {
  // Mensajes generales (login, logout, errores)
  const [mensaje, setMensaje] = useState('');

  // Comprobar si hay sesión
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Función para iniciar sesión simulada
  const login = () => {
    localStorage.setItem('authToken', 'token-simulado-electroshop');
    setMensaje('Sesión iniciada correctamente');
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    setMensaje('Sesión cerrada');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      
      {!isAuthenticated && (
        <>
          <h2>Acceso a ElectroShop</h2>
          <button onClick={login} style={{ padding: '8px 12px', marginTop: '10px' }}>
            Iniciar sesión
          </button>
          {mensaje && <p>{mensaje}</p>}
        </>
      )}

      {isAuthenticated && (
        <>
          <button onClick={logout} style={{ marginBottom: '20px', padding: '6px 10px' }}>
            Cerrar sesión
          </button>
          {mensaje && <p>{mensaje}</p>}

          {/* Aquí se renderiza el CRUD de productos */}
          <ProductoComponent />
        </>
      )}
    </div>
  );
}

export default App;