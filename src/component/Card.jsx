import React from "react";
import "../assets/Card.css";

import { Card as PrimeCard } from "primereact/card";
import { Button } from "primereact/button";

const Card = ({ item, addToCart }) => {

  //(Image ko header me use kiya)
  const header = (
    <img
      alt={item.title}
      src={item.thumbnail}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px 10px 0 0"
      }}
    />
  );

  return (

    // PrimeReact Card use
    <PrimeCard
      title={item.title}                  
      subTitle={`₹ ${item.price}`}        
      header={header}                    
      className="shadow-2"
    >

      {/* description */}
<p>
  {item.description.length > 60
    ? item.description.substring(0, 60) + "..."
    : item.description}
</p>
      {/* category */}
      <p><b>Category:</b> {item.category}</p>

      {/* PrimeReact Button */}
      <Button
        label="Add to Cart"
        icon="pi pi-shopping-cart"
        className="p-button-warning"
        onClick={() => addToCart(item)}
      />

    </PrimeCard>
  );
};

export default Card;