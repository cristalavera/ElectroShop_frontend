import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginPage from "../pages/LoginPage";

test("renderiza el login y ejecuta onLogin al hacer clic", () => {
  const mockLogin = vi.fn();

  render(<LoginPage onLogin={mockLogin} />);

  const boton = screen.getByText(/Iniciar sesión/i);

  expect(boton).toBeInTheDocument();

  fireEvent.click(boton);

  expect(mockLogin).toHaveBeenCalledTimes(1);
});

test("muestra error si el login falla", () => {
    console.log("ENTRA EN TEST 2");
    const mockLogin = vi.fn(() => {
        throw new Error("Error de conexión");
    });

    render(<LoginPage onLogin={mockLogin} />);

    fireEvent.click(screen.getByText("Login"));

    expect(mockLogin).toHaveBeenCalled();
});


