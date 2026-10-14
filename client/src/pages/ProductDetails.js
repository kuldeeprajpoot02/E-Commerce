import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../App.css";

const API_URL = "https://e-commerce-ivel.onrender.com/api/v1/product";

const ProductDetails = () => {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchProduct = async () => {
try {
setLoading(true);
setError("");

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Products load nahi ho paaye.");
    }

    const data = await response.json();

    const selectedProduct = (data.products || []).find(
      (item) => item._id === id
    );

    if (!selectedProduct) {
      throw new Error("Product nahi mila.");
    }

    setProduct(selectedProduct);
  } catch (err) {
    setError(err.message || "Kuch galat ho gaya.");
  } finally {
    setLoading(false);
  }
};

fetchProduct();

}, [id]);

if (loading) {
return ( <Layout> <p className="empty-message">Loading product details...</p> </Layout>
);
}

if (error || !product) {
return ( <Layout> <div className="product-details"> <p className="empty-message">
{error || "Product nahi mila."} </p> <Link className="primary-button" to="/">
Back to Home </Link> </div> </Layout>
);
}

return ( <Layout> <main className="product-details"> <Link className="back-link" to="/">
← Back to Products </Link>

    <div className="details-layout">
      <div className="details-image-wrap">
        <img
          className="details-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="details-info">
        <span className="product-category">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        <p className="details-description">
          {product.description}
        </p>

        <p className="stock-status">
          {product.quantity > 0
            ? `In stock: ${product.quantity} available`
            : "Currently out of stock"}
        </p>

        <button
          type="button"
          className="add-button"
          disabled={product.quantity <= 0}
          onClick={() => {
            alert(
              "Product details sahi hain! Cart integration agle step mein karenge."
            );
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </main>
</Layout>

);
};

export default ProductDetails;
