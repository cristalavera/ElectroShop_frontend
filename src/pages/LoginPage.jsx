import React, { useState } from "react";

function LoginPage({ onLogin }) {
  // 🔹 ESTADOS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* TARJETA */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full">
        {/* IMAGEN */}
        <div className="h-40 md:h-auto">
          <img
            src="/fondo_login.jpeg"
            className="h-full w-full object-cover"
            alt="Login"
          />
        </div>

        {/* FORMULARIO */}
        <div className="p-8 flex flex-col justify-center">
          <h2
            data-testid="titulo-login"
            className="text-2xl font-bold mb-2 text-center md:text-left"
          >
            Bienvenido a <span className="text-blue-600">ElectroShop</span>
          </h2>

          <p className="text-gray-500 mb-6 text-center md:text-left">
            Panel de gestión de inventario
          </p>

          <form className="flex flex-col gap-4">
            <input
              data-testid="email-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-2"
            />

            <input
              data-testid="password-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-4 py-2"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                data-testid="terms-checkbox"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              Acepto los términos
            </label>

            <button
              data-testid="login-button"
              type="button"
              onClick={() => {
                if (!email || !password) {
                  setError("Debes rellenar todos los campos");
                  return;
                }

                if (!accepted) {
                  setError("Debes aceptar los términos");
                  return;
                }

                setError("");
                onLogin(email); // 👈 importante (pasamos email)
              }}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
