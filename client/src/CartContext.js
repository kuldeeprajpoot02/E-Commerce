import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load saved cart when the app starts
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Could not load saved cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return previousCart.map((item) =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, cartQuantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item._id === id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item._id === id
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item._id !== id)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};