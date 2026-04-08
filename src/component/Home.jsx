import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProductPage from "./ProductPage";
import Wishlist from "./WishList";

const Home = () => {
  //  LOAD FROM LOCAL STORAGE
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  //  POPUP CONTROL
  const [showWishlist, setShowWishlist] = useState(false);

  //  ADD / REMOVE
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  //  REMOVE FROM POPUP
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  //  SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <>
      {/*  HEADER */}
      <Header
        wishlistCount={wishlist.length}
        openWishlist={() => setShowWishlist(true)}
      />

      {/*  PRODUCT PAGE */}
      <ProductPage wishlist={wishlist} toggleWishlist={toggleWishlist} />

      {/*  POPUP */}
      {showWishlist && (
        <Wishlist
          wishlist={wishlist}
          closeWishlist={() => setShowWishlist(false)}
          removeFromWishlist={removeFromWishlist}
        />
      )}
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react'
// import Header from './Header'
// import ProductPage from "./ProductPage"

// const Home = () => {

//   //  LOAD FROM LOCAL STORAGE
//   const [wishlist, setWishlist] = useState(() => {
//     const savedWishlist = localStorage.getItem("wishlist");
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   });

//   //  SAVE TO LOCAL STORAGE
//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   //  TOGGLE
//   const toggleWishlist = (product) => {
//     const exists = wishlist.find((item) => item.id === product.id);

//     if (exists) {
//       setWishlist(wishlist.filter((item) => item.id !== product.id));
//     } else {
//       setWishlist([...wishlist, product]);
//     }
//   };

//   return (
//     <div>
//       <Header wishlistCount={wishlist.length} />

//       <ProductPage
//         wishlist={wishlist}
//         toggleWishlist={toggleWishlist}
//       />
//     </div>
//   )
// }

// export default Home;
