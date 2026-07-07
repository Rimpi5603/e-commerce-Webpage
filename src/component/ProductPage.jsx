import React, { useEffect, useState } from "react";
import "../assets/ProductPage.css";

// PrimeReact
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // 🔥 UPDATED

// COMPONENTS
import Card from "./Card";
import Cart from "./Cart";

const ProductPage = ({ wishlist, toggleWishlist }) => {

  const categoryOptions = [
    { label: "All", value: "all" },
    { label: "Beauty", value: "beauty" },
    { label: "Groceries", value: "groceries" },
  ];

  // ================= STATE =================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // CART STATE (Local Storage)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Pagination 
  const [first, setFirst] = useState(0);   
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

  // Component mount after API call 
  useEffect(() => {
    fetchProducts();
  }, []);

  // ====Filtering Logic =================
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
    setFirst(0);   // UPDATED for Pagination Reset
  }, [search, category, products]);

  // =CART LOGIC -- Add to Cart=================
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

  // 🔥 UPDATED (ConfirmDialog logic)
  const removeFromCart = (id) => {
    confirmDialog({
      message: "Are you sure?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
      },
    });
  };

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ================= PAGINATION LOGIC =================
  const currentProducts = filteredProducts.slice(
    first,
    first + productsPerPage
  );   //  UPDATED

  // ================= SORT =================
  const sortLowToHigh = () => {
    const sorted = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sorted);
  };

  // ================= UI =================
  return (
    <div className="main-layout">

      {/*  UPDATED (Required for ConfirmDialog UI) */}
      <ConfirmDialog />

      {/* LEFT SIDE */}
      <div className="product-container">
        <h1>Products</h1>

        {/* CONTROLS */}
        <div className="top-controls">
          <InputText
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Dropdown
            value={category}
            options={categoryOptions}
            onChange={(e) => setCategory(e.value)}
            placeholder="Select Category"
          />

          <Button
            label="Low → High"
            icon="pi pi-arrow-up"
            className="p-button-success"
            onClick={sortLowToHigh}
          />

          <Button
            label="High → Low"
            icon="pi pi-arrow-down"
            className="p-button-danger"
            onClick={sortHighToLow}
          />
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="product-grid">
              {currentProducts.map((item) => {
                const isWishlisted = wishlist.some((w) => w.id === item.id);

                return (
                  <div key={item.id} className="card-wrapper">

                    <Button
                      icon={isWishlisted ? "pi pi-heart-fill" : "pi pi-heart"}
                      className="p-button-rounded p-button-text wishlist-btn"
                      onClick={() => toggleWishlist(item)}
                    />

                    <Card item={item} addToCart={addToCart} />
                  </div>
                );
              })}
            </div>

            {/* 🔥 PAGINATOR */}
            <Paginator
              first={first}
              rows={productsPerPage}
              totalRecords={filteredProducts.length}
              onPageChange={(e) => setFirst(e.first)}
            />
          </>
        )}
      </div>

      {/* RIGHT SIDE CART */}
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductPage;