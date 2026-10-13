import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Category from "./pages/category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";

import Register from "./pages/Register";
import Login from "./pages/Login";

import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </CartProvider>
  );
}

export default App;