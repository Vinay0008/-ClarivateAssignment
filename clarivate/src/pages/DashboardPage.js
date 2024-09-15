import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/list">
        <button className="button">Go to List</button>
      </Link>
      <div>
        <h2>Favorites</h2>
      </div>
    </div>
  );
};

export default DashboardPage;
