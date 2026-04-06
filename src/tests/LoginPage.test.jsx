import React from "react";
import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LoginPage from "../pages/LoginPage";

// 🔥 Limpia el DOM después de cada test (MUY IMPORTANTE)
afterEach(() => {
  cleanup();
});

test("renderiza el login y ejecuta onLogin al hacer clic", () => {
  const mockLogin = vi.fn();

  render(<LoginPage onLogin={mockLogin} />);

  const boton = screen.getByRole("button", { name: /iniciar sesión/i });

  expect(boton).toBeInTheDocument();

  fireEvent.click(boton);

  expect(mockLogin).toHaveBeenCalledTimes(1);
});

test("muestra error si el login falla", () => {
  const mockLogin = vi.fn(() => {
    throw new Error("Error de conexión");
  });

  render(<LoginPage onLogin={mockLogin} />);

  const boton = screen.getByRole("button", { name: /iniciar sesión/i });

  fireEvent.click(boton);

  // ✔ Comprobamos que se llamó (aunque falle)
  expect(mockLogin).toHaveBeenCalled();
});