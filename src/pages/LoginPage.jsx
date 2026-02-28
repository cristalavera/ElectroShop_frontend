function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* TARJETA */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:grid md:grid-cols-2 max-w-4xl w-full">

        {/* IMAGEN */}
        <div className="hidden md:block">
          <img
            src="/fondo_login.jpeg"
            className="h-full w-full object-cover"
          />
        </div>

        {/* FORMULARIO */}
        <div className="p-8 flex flex-col justify-center">

          <h2 className="text-2xl font-bold mb-2">
            Bienvenido a <span className="text-blue-600">ElectroShop</span>
          </h2>

          <p className="text-gray-500 mb-6">
            Panel de gestión de inventario
          </p>

          <form className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Acepto los términos
            </label>

            {/* BOTÓN */}
            <button
              type="button"
              onClick={onLogin}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;