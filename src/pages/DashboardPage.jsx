import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DashboardPage({ onLogout }) {
  // Estados
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Cargar productos al iniciar la aplicación
  useEffect(() => {
    axios
      .get(`${API_URL}/productos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Función para manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock) {
      setMensaje("Por favor, completa todos los campos obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

    try {
      const res = await axios.post(`${API_URL}/productos`, nuevoProducto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProductos([...productos, res.data]);
      setMensaje(`Producto "${res.data.nombre}" creado con éxito!`);
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear el producto");
    }
  };

  const eliminarProducto = async (id) => {
    try {
      // 1. OBTENER el token
      const token = localStorage.getItem("authToken");

      // 2. LÍNEA DE VERIFICACIÓN (Muestra el valor en la consola)
      console.log(
        "Token para DELETE:",
        token
          ? "ENVIANDO: " + token.substring(0, 10) + "..."
          : "ERROR: No hay token",
      );

      // 3. Petición Axios, usando el token en los headers
      await axios.delete(`${API_URL}/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />

      <div className="p-6">
        {/* ZONA CRUD */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Gestión de inventario</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Añadir producto
          </button>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* PANEL IZQUIERDO */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded shadow">
            <ProductForm />
          </div>

          {/* PANEL DERECHO */}
          <div className="md:col-span-2">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
