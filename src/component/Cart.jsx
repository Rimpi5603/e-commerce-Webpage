import React from "react";
import "../assets/Card.css";

const Cart = ({ cartItems, removeFromCart  }) => {
  return (
    <div className="cart-container">
      <h2>My Cart Items🛒</h2>

      {cartItems.length === 0 ? (
         <p> My items added</p>
       ) : 
      (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>₹ {item.price}</p>
              <p>Qty: {item.quantity}</p>

               {/*  REMOVE BUTTON (NEW) */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove 
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
