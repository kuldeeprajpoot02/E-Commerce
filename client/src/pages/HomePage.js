
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../CartContext";
import "../App.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { addToCart, cartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:8081/api/v1/product"
        );

        if (!response.ok) {
          throw new Error("Products load nahi ho paaye.");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          setError("Products ka data sahi format mein nahi hai.");
        }
      } catch (err) {
        setError(
          "Backend se connection nahi ho raha. Backend server check karein."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} cart mein add ho gaya!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Layout>
      <div className="shop">
        <section className="hero">
          <div>
            <p className="eyebrow">YOUR EVERYDAY SHOP</p>
            <h1>Find products you'll love.</h1>
            <p>
              Discover electronics, fashion and home essentials
              in one place.
            </p>

            <a className="primary-button" href="#products">
              Explore Products
            </a>
          </div>
        </section>

        <section className="shop-toolbar">
          <div>
            <h2>Our Products</h2>
            <p>Explore our collection.</p>
          </div>

          <div className="shop-actions">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />

            <Link to="/cart" className="cart-count">
              Cart: {cartCount}
            </Link>
          </div>
        </section>

        <nav className="category-filters" aria-label="Product categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

          <Link className="filter category-link" to="/category">
            Category Page
          </Link>
        </nav>

        {message && (
          <p
            role="status"
            style={{
              padding: "12px",
              background: "#e8f5e9",
              color: "#1b5e20",
              borderRadius: "8px",
              margin: "16px 0",
            }}
          >
            {message}
          </p>
        )}

        {loading && (
          <p className="empty-message">Loading products...</p>
        )}

        {!loading && error && (
          <p className="empty-message">{error}</p>
        )}

        {!loading && !error && (
          <>
            <section id="products" className="product-grid">
              {filteredProducts.map((product) => {
                const outOfStock =
                  Number(product.quantity) <= 0;

                return (
                  <article className="product-card" key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name || "Product"}
                        loading="lazy"
                      />
                    </Link>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>

                      <p className="product-description">
                        {product.description}
                      </p>

                      <div className="product-bottom">
                        <strong>
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </strong>

                        <button
                          type="button"
                          className="add-button"
                          disabled={outOfStock}
                          onClick={() => handleAddToCart(product)}
                          style={{
                            display: "inline-block",
                            visibility: "visible",
                            opacity: 1,
                            backgroundColor: outOfStock
                              ? "#999"
                              : "#5b45c6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 12px",
                            cursor: outOfStock ? "not-allowed" : "pointer",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {outOfStock ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {filteredProducts.length === 0 && (
              <p className="empty-message">
                No products found. Try another search.
              </p>
            )}
          </>
        )}

        <p className="demo-note">
          Products are loaded from the backend API.
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;