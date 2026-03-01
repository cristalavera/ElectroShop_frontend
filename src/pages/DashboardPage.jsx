import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DashboardPage({ onLogout }) {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [viewMode, setViewMode] = useState("card");

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 GET productos
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // 🔹 Si estamos en modo demo → no llamamos al backend
    if (token === "demo-token") {
      setProductos([
        {
          id: 1,
          nombre: "Producto Demo",
          descripcion: "Ejemplo de producto",
          precio: 99.99,
          stock: 10,
        },
        {
          id: 2,
          nombre: "Producto Demo 2",
          descripcion: "Otro ejemplo",
          precio: 49.99,
          stock: 5,
        },
      ]);
      return;
    }

    axios
      .get(`${API_URL}/productos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProductos(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          onLogout();
        }
      });
  }, []);

  // 🔹 POST producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock) {
      setMensaje("Completa los campos obligatorios");
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
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setMensaje("");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        onLogout();
      }
    }
  };

  // 🔹 DELETE producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        onLogout();
      }
    }
  };

  const modificarProducto = () => {
    alert("Aquí se abrirá el modal de edición en el ejercicio 7");
  };

  console.log("Productos:", productos);
  return (
    <div>
      <Navbar onLogout={onLogout} />

      <div className="p-6">
        {/* ACCIONES */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h2 className="text-xl font-semibold">Inventario ElectroShop</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("card")}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Tarjetas
            </button>

            <button
              onClick={() => setViewMode("list")}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Lista
            </button>

            <button className="bg-primary text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90">
              Añadir producto
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FORMULARIO */}
          <div className="bg-panel p-6 rounded-xl shadow-sm border border-gray-300">
            <h3 className="font-semibold mb-3">Nuevo producto</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                placeholder="Nombre*"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Precio*"
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Stock*"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border p-2 rounded"
              />

              <button className="bg-secondary text-white py-2 rounded-lg shadow-sm hover:opacity-90">
                Crear Producto
              </button>
            </form>
          </div>

          {/* PRODUCTOS */}
          <div className="md:col-span-2">
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productos.map((p) => (
                  <div
                    key={p.id}
                    className="bg-card border p-4 rounded-xl shadow-sm"
                  >
                    <h3 className="font-semibold">{p.nombre}</h3>
                    <p>{p.descripcion}</p>
                    <p>Precio: {p.precio}€</p>
                    <p>Stock: {p.stock}</p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => modificarProducto(p)}
                        className="bg-warning text-white text-xs px-3 py-1 rounded"
                      >
                        Modificar
                      </button>

                      <button
                        onClick={() => eliminarProducto(p.id)}
                        className="bg-danger text-white text-xs px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full border bg-card rounded-xl overflow-hidden">
                <thead className="bg-panel">
                  <tr>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Precio</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-3">{p.nombre}</td>
                      <td className="px-4 py-3">{p.precio}€</td>
                      <td className="px-4 py-3">{p.stock}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => modificarProducto(p)}
                          className="bg-warning text-white text-xs px-3 py-1 rounded"
                        >
                          Modificar
                        </button>
                        <button
                          onClick={() => eliminarProducto(p.id)}
                          className="bg-danger text-white text-xs px-3 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
