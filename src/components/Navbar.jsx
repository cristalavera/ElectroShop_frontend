function Navbar({ onLogout }) {
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
      <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">

        <div className="flex items-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>

          <span className="text-sm md:text-base">Usuario</span>
        </div>

        <button
          onClick={onLogout}
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition text-sm md:text-base"
        >
          Cerrar sesión
        </button>

      </div>

    </div>
  );
}

export default Navbar;

