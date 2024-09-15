import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage";
import "@testing-library/jest-dom";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <button onClick={() => (window.location.href = "/list")}>Go to List</button>
  </div>
);

describe("Dashboard Page Navigation", () => {
  test("navigates to List when 'Go to List' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/list"
            element={<ListPage favorites={[]} setFavorites={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Go to List/i));

    expect(screen.getByText(/List/i)).toBeInTheDocument();
  });
});
