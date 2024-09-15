import React, { useState } from "react";

const ItemCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="item-card">
      <img src={item.thumbnailUrl} alt={item.title} width={100} />
      <div>
        <h3>{item.id}</h3>
        <h3>{item.title}</h3>
        <button className="button" onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
