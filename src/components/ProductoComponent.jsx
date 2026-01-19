import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductoComponent() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [mensaje, setMensaje] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  // Cargar productos al iniciar
  useEffect(() => {
	  axios.get(`${API_URL}/productos`, {
		headers: {
		  Authorization: `Bearer ${localStorage.getItem('authToken')}`
		}
	  })
		.then(res => setProductos(res.data))
		.catch(err => console.error(err));
  }, []);


  // Función para manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock) {
      setMensaje('Por favor, completa todos los campos obligatorios');
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };

    try {
  	const res = await axios.post(`${API_URL}/productos`, nuevoProducto, {
    		headers: {
      			Authorization: `Bearer ${localStorage.getItem('authToken')}`
    		}
 	});
  	setProductos([...productos, res.data]);
  	setMensaje(`Producto "${res.data.nombre}" creado con éxito!`);
  	setNombre(''); setDescripcion(''); setPrecio(''); setStock('');
    } catch (error) {
      console.error(error);
      setMensaje('Error al crear el producto');
    }
  };

const eliminarProducto = async (id) => {
		try {
			// 1. OBTENER el token
			const token = localStorage.getItem('authToken');
    
			// 2. LÍNEA DE VERIFICACIÓN (Muestra el valor en la consola)
			console.log('Token para DELETE:', token ? 'ENVIANDO: ' + token.substring(0, 10) + '...' : 'ERROR: No hay token');
    
			// 3. Petición Axios, usando el token en los headers
			await axios.delete(`${API_URL}/productos/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
				setProductos(productos.filter(p => p.id !== id));
		} catch (error) {
			console.error(error);
	}
		};

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Nombre*" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <input placeholder="Precio*" type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} />
        <input placeholder="Stock*" type="number" value={stock} onChange={e => setStock(e.target.value)} />
        <button type="submit">Crear Producto</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      <h2>Lista de Productos</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {productos.map(p => (
          <div key={p.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '6px',
            background: '#f9f9f9'
          }}>
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>Precio:</strong> {p.precio.toFixed(2)} €</p>
            <p><strong>Stock:</strong> {p.stock}</p>
			
	    {/* BOTÓN DELETE */}
	    <button
		onClick={() => eliminarProducto(p.id)}
		style={{
		    marginTop: '10px',
		    backgroundColor: '#e74c3c',
		    color: 'white',
		    border: 'none',
		    padding: '6px 10px',
		    borderRadius: '4px',
		    cursor: 'pointer'
		}}
	     >
		Eliminar
	     </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductoComponent;

