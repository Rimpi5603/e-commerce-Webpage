import React, { useEffect, useState } from "react";
import "../assets/ProductPage.css";
// for reactprime

        

// COMPONENTS
import Card from "./Card";
import Cart from "./Cart";

const ProductPage = ({ wishlist, toggleWishlist }) => {   // NEW (props receive)

  // ================= STATE =================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // CART STATE (UNCHANGED)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FILTER =================
  useEffect(() => {
    let updated = products;

    if (search) {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
 
    if (category !== "all") {
      updated = updated.filter((item) => item.category === category);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
   }, [search, category, products]);



  // ================= Cart  LOGIC (UNCHANGED) =================
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  // ================= Pagination =================
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ================= SORT =================
  const sortLowToHigh = () => {
    const sorted = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sorted);
    console.log(sorted,"sdfgh")
  };

  const sortHighToLow = () => {
    const sorted = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sorted);
    console.log(sorted ,"tttttt")
  };

  // ================= UI =================
  return (
    <div className="main-layout">

      {/* LEFT SIDE */}
      <div className="product-container">
        <h1>Products</h1>

        {/* CONTROLS */}
        <div className="top-controls">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="beauty">Beauty</option>
            <option value="groceries">Groceries</option>
          </select>

          <button onClick={sortLowToHigh}>Price Low → High</button>
          <button onClick={sortHighToLow}>Price High → Low</button>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="product-grid">
              {currentProducts.map((item) => {

                // NEW (check wishlist)
                const isWishlisted = wishlist.some(
                  (w) => w.id === item.id
                );

                return (
                  <div key={item.id} className="card-wrapper">

                    {/* NEW ❤️ HEART ICON */}
                    <div
                      className="wishlist-icon"
                      onClick={() => toggleWishlist(item)}
                    >
                      {isWishlisted ? "❤️" : "🤍"}
                    </div>

                    {/* ORIGINAL CARD */}
                    <Card
                      item={item}
                      addToCart={addToCart}
                    />

                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDE CART  */}
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />

    </div>
  );
};

export default ProductPage;