import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import "./ListPage.scss";

const ListPage = ({ favorites, setFavorites }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        setItems((prevItems) => [...prevItems, ...response.data]);
        if (response.data.length < 10) setHasMore(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const ref = containerRef.current;
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleFavoriteToggle = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>
      <h1>List</h1>
      <Link to="/">
        <button className="back-button">Back to Dashboard</button>
      </Link>
      <div style={{ margin: "20vh" }}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            isFavorite={favorites.some((fav) => fav.id === item.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
