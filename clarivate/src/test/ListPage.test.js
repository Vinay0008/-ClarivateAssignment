import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

const mock = new MockAdapter(axios);
const Dashboard = () => <h1>Dashboard</h1>;

describe("ListPage", () => {
  afterEach(() => {
    mock.reset();
  });

  test("shows loader while fetching data", async () => {
    mock
      .onGet(
        "https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=10"
      )
      .reply(200, []);

    render(
      <Router>
        <ListPage favorites={[]} setFavorites={() => {}} />
      </Router>
    );

    expect(screen.getByText(/Loading more items.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByText(/Loading more items.../i)
      ).not.toBeInTheDocument();
    });
  });

  test("navigates to Dashboard when 'Back to Dashboard' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/list"]}>
        <Routes>
          <Route
            path="/list"
            element={<ListPage favorites={[]} setFavorites={() => {}} />}
          />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/List/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Back to Dashboard/i));

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
