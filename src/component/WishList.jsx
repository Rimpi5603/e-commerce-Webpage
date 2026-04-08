import React from "react";
import "../assets/Wishlist.css";

const Wishlist = ({ wishlist, closeWishlist, removeFromWishlist }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>My Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p>No items selected</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="item">
              <img src={item.thumbnail} alt={item.title} />

              <div>
                <p>{item.title}</p>
                <p>₹ {item.price}</p>
              </div>

              <button onClick={() => removeFromWishlist(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}

        <button onClick={closeWishlist}>Close</button>
      </div>
    </div>
  );
};

export default Wishlist;