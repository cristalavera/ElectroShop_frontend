import { useState, useEffect } from "react";

function Navbar({ onLogout }) {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(false);
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="bg-white shadow-md px-4 md:px-6 py-4 flex flex-col md:flex-row items-center md:items-center text-center md:text-left md:justify-between gap-3">
      {/* IZQUIERDA */}
      <img
        src="/logo.jpg"
        alt="ElectroShop"
        className="h-12 md:h-16 w-auto object-contain"
      />

      {/* CENTRO */}
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 text-center">
        Panel de gestión de inventario
      </h2>

      {/* DERECHA */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(!openMenu);
          }}
          className="flex items-center gap-2 text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
          </svg>

          <span className="text-sm md:text-base">Usuario</span>
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Perfil
            </button>

            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Ajustes
            </button>

            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
