import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const login = () => {
    localStorage.setItem("authToken", "token-simulado-electroshop");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={login} />
      ) : (
        <DashboardPage onLogout={logout} />
      )}
    </>
  );
}

export default App;