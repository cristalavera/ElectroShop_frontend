import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { vi, test, expect, afterEach } from "vitest";

import LoginPage from "../pages/LoginPage";

afterEach(() => {
  cleanup();
});

test("renderiza correctamente el formulario de login", () => {
  render(<LoginPage onLogin={() => {}} />);

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();

  expect(screen.getByText(/acepto los términos/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /iniciar sesión/i,
    }),
  ).toBeInTheDocument();
});

test("ejecuta login correctamente", () => {
  const mockLogin = vi.fn();

  render(<LoginPage onLogin={mockLogin} />);

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "admin@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: "1234" },
  });

  fireEvent.click(screen.getByRole("checkbox"));

  fireEvent.click(
    screen.getByRole("button", {
      name: /iniciar sesión/i,
    }),
  );

  expect(mockLogin).toHaveBeenCalledTimes(1);

  expect(mockLogin).toHaveBeenCalledWith("admin@test.com");
});

test("muestra error si faltan campos", () => {
  render(<LoginPage onLogin={() => {}} />);

  fireEvent.click(
    screen.getByRole("button", {
      name: /iniciar sesión/i,
    }),
  );

  expect(
    screen.getByText(/debes rellenar todos los campos/i),
  ).toBeInTheDocument();
});

test("muestra error si no se aceptan los términos", () => {
  render(<LoginPage onLogin={() => {}} />);

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "admin@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: "1234" },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /iniciar sesión/i,
    }),
  );

  expect(screen.getByText(/debes aceptar los términos/i)).toBeInTheDocument();
});
