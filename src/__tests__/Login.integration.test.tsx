import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "../App";
import Login from "../pages/Login";

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login Flow Integration", () => {
  test("renders login page and redirects on successful login", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Check if login form is rendered
    expect(screen.getByText(/NexSales Login/i)).toBeInTheDocument();

    // Simulate typing
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "admin@nexsales.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate clicking login
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    // Assert redirect - in a real integration test we'd check for dashboard element,
    // but since we rendered Login in isolation with mocked navigate:
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
