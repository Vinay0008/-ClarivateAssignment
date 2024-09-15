import React from "react";
import "./ItemCard.scss";

const ItemCard = ({ item, isFavorite, onFavoriteToggle }) => {
  return (
    <div className="item-card">
      <img src={item.thumbnailUrl} alt={item.title} />
      <div>
        <h3>{item.id}</h3>
        <h3>{item.title}</h3>
        <button
          className={`favorite-button ${isFavorite ? "added" : "not-added"}`}
          onClick={() => onFavoriteToggle(item)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
