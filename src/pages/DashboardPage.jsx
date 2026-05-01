import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const initialState = {
  productos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
      };
    default:
      return state;
  }
}

function DashboardPage({ onLogout }) {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  // 🔹 CARGAR PRODUCTOS
  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        onLogout();
        return;
      }

      const res = await axios.get(`${API_URL}/productos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "SET_PRODUCTOS",
        payload: res.data,
      });

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        onLogout();
      }
    }
  };

  // 🔹 CARGA INICIAL
  useEffect(() => {
    cargarProductos();
  }, []);

  // 🔹 EVENTO PERSONALIZADO
  useEffect(() => {
    const handler = () => {
      console.log("Producto creado!");
    };

    window.addEventListener("productoCreado", handler);

    return () => {
      window.removeEventListener("productoCreado", handler);
    };
  }, []);

  // 🔹 CREAR PRODUCTO
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      onLogout();
      return;
    }

    if (!nombre || !precio || !stock) {
      alert("Completa los campos obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

    try {
      await axios.post(`${API_URL}/productos`, nuevoProducto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.dispatchEvent(new Event("productoCreado"));

      await cargarProductos();

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setShowForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

    } catch (error) {
      console.error("Error al crear producto:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        onLogout();
      }
    }
  };

  // 🔹 ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      onLogout();
      return;
    }

    try {
      setDeletingId(id);

      await axios.delete(`${API_URL}/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await cargarProductos();

      setDeletingId(null);

    } catch (error) {
      console.error("Error al eliminar:", error);
      setDeletingId(null);

      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        onLogout();
      }
    }
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
              className={`px-4 py-2 rounded-lg text-white ${
                showForm ? "bg-gray-500" : "bg-primary"
              }`}
            >
              {showForm ? "Cerrar" : "Añadir producto"}
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FORMULARIO */}
          {showForm && (
            <div className="md:col-span-1">
              <div className="bg-panel p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-3">Nuevo producto</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <input
                    placeholder="Nombre*"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onKeyUp={(e) => console.log("Tecla:", e.key)}
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
          <div className={`${showForm ? "md:col-span-2" : "md:col-span-3"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.productos.map((p) => (
                <div
                  key={p.id}
                  className={`bg-card border p-4 rounded-xl ${
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;