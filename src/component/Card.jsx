// Component (Reusable)

//  Ye har product ko show karega + Add to Cart button handle karega

import React from "react";
import "../assets/Card.css";

const Card = ({ item, addToCart }) => {
  return (
    <div className="card">
      <img src={item.thumbnail} alt={item.title} />
      <h3>{item.title}</h3>
      <p>₹ {item.price}</p>

      {/*  ADD TO CART */}
      <button onClick={() => addToCart(item)} className="cart-btn">
        Add to Cart
      </button>

      <span>{item.category}</span>
    </div>
  );
};

export default Card;