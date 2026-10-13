import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../CartContext";
import "../App.css";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <Layout>
      <div className="shop">
        <h1>Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/">Continue Shopping</Link>
          </div>
        ) : (
          <>
            {cart.map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 0",
                  borderBottom: "1px solid #ddd",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3>{product.name}</h3>
                  <p>
                    Price: ₹
                    {Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <div>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product._id)}
                    >
                      −
                    </button>

                    <span style={{ margin: "0 12px" }}>
                      {product.cartQuantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: ₹
                    {(
                      Number(product.price) * product.cartQuantity
                    ).toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h2>
              Total: ₹{cartTotal.toLocaleString("en-IN")}
            </h2>

            <Link to="/">Continue Shopping</Link>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;