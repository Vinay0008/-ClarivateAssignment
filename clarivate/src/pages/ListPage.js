import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";

const ListPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ height: "100vh", overflowY: "scroll" }}
    >
      <h1>List</h1>
      <Link to="/">
        <button className="button">Back to Dashboard</button>
      </Link>
      <div>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
