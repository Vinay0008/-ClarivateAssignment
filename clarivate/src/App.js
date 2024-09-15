import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ListPage from "./pages/ListPage";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage favorites={favorites} />} />
        <Route
          path="/list"
          element={
            <ListPage favorites={favorites} setFavorites={setFavorites} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
