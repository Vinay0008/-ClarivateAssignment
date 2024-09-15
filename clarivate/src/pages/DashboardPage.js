import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.scss";

const DashboardPage = ({ favorites }) => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Link to="/list">
        <button>Go to List</button>
      </Link>
      <div className="favorites-section">
        <h2>Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
