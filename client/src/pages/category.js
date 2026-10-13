
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import products from "../data/products";
import "../App.css";

const Category = () => {
  const categories = [...new Set(products.map((item) => item.category))];
  const [selected, setSelected] = useState("All");

  const visibleProducts =
    selected === "All"
      ? products
      : products.filter((item) => item.category === selected);

  return (
    <Layout>
      <main className="category-page">
        <h1>Shop by Category</h1>
        <p>Choose a category to explore products.</p>

        <div className="category-filters">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              type="button"
              className={selected === item ? "filter active" : "filter"}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <span className="product-category">
                  {product.category}
                </span>
                <h3>{product.name}</h3>
                <strong>
                  ₹{product.price.toLocaleString("en-IN")}
                </strong>
              </div>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Category;