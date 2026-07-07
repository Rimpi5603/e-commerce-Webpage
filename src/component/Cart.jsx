import React from "react";
import "../assets/Card.css";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Message } from "primereact/message";

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cart-container">
      <h2>
        My Cart <i className="pi pi-shopping-cart"></i>
      </h2>

      {cartItems.length === 0 ? (
        <Message severity="info" text="No items in cart" />
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} className="cart-card">
            <div className="cart-item">
              <img src={item.thumbnail} alt={item.title} />

              <div>
                <h4>{item.title}</h4>
                <p>₹ {item.price}</p>

                <p>
                  Qty: <Badge value={item.quantity} />
                </p>

                <Button
                  label="Remove"
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Cart;




























// import React from "react";
// import "../assets/Card.css";

// const Cart = ({ cartItems, removeFromCart  }) => {
//   return (
//     <div className="cart-container">
//       <h2>My Cart Items🛒</h2>

//       {cartItems.length === 0 ? (
//          <p> My items added</p>
//        ) : 

//       (
//         cartItems.map((item) => (
//           <div key={item.id} className="cart-item">
//             <img src={item.thumbnail} alt={item.title} />
//             <div>
//               <h4>{item.title}</h4>
//               <p>₹ {item.price}</p>
//               <p>Qty: {item.quantity}</p>

//                {/*  REMOVE BUTTON (NEW) */}
//               <button
//                 className="remove-btn"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 Remove 
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;
