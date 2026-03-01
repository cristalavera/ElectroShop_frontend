import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DashboardPage({ onLogout }) {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [fadeView, setFadeView] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token === "demo-token") {
      setProductos([
        {
          id: 1,
          nombre: "Producto Demo",
          descripcion: "Ejemplo",
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
        headers: { Authorization: `Bearer ${token}` },
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock) return;

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

    setProductos([...productos, { ...nuevoProducto, id: Date.now() }]);

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setShowForm(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const eliminarProducto = (id) => {
    setDeletingId(id);

    setTimeout(() => {
      setProductos(productos.filter((p) => p.id !== id));
      setDeletingId(null);
    }, 300);
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg animate-fade">
          Producto creado correctamente
        </div>
      )}

      <div className="p-4 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold">Inventario ElectroShop</h2>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                setFadeView(false);
                setTimeout(() => {
                  setViewMode("card");
                  setFadeView(true);
                }, 150);
              }}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Tarjetas
            </button>

            <button
              onClick={() => {
                setFadeView(false);
                setTimeout(() => {
                  setViewMode("list");
                  setFadeView(true);
                }, 150);
              }}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Lista
            </button>

            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
                showForm ? "bg-gray-500" : "bg-primary"
              }`}
            >
              {showForm ? "Cerrar" : "Añadir producto"}
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FORMULARIO SOLO SI ESTÁ ABIERTO */}
          {showForm && (
            <div className="md:col-span-1 animate-fade">
              <div className="bg-panel p-6 rounded-xl shadow-sm border">
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

                  <button className="bg-secondary text-white py-2 rounded-lg">
                    Crear Producto
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* PRODUCTOS */}
          <div
            className={`transition-opacity duration-300 ${
              fadeView ? "opacity-100" : "opacity-0"
            } ${showForm ? "md:col-span-2" : "md:col-span-3"}`}
          >
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productos.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-card border p-4 rounded-xl shadow-sm transition-opacity duration-300 ${
                      deletingId === p.id ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <h3 className="font-semibold">{p.nombre}</h3>
                    <p>{p.descripcion}</p>
                    <p>Precio: {p.precio}€</p>
                    <p>Stock: {p.stock}</p>

                    <div className="flex gap-2 mt-2">
                      <button className="bg-warning text-white text-xs px-3 py-1 rounded">
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
              <div className="w-full overflow-x-auto">
                <table className="min-w-full w-full border bg-card rounded-xl table-auto">
                  <thead className="bg-panel">
                    <tr>
                      <th className="px-4 py-3 text-left">Nombre</th>
                      <th className="px-4 py-3 text-left">Precio</th>
                      <th className="px-4 py-3 text-left">Stock</th>
                      <th className="px-4 py-3 text-left">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productos.map((p) => (
                      <tr
                        key={p.id}
                        className={`border-t transition-opacity duration-300 ${
                          deletingId === p.id ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        <td className="px-4 py-3">{p.nombre}</td>
                        <td className="px-4 py-3">{p.precio}€</td>
                        <td className="px-4 py-3">{p.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="bg-warning text-white text-xs px-3 py-1 rounded">
                              Modificar
                            </button>

                            <button
                              onClick={() => eliminarProducto(p.id)}
                              className="bg-danger text-white text-xs px-3 py-1 rounded"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
