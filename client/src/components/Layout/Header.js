import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Check whether a login session is saved
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const isLoggedIn = Boolean(auth?.token);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            🛒 Ecommerce App
          </Link>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart ({cartCount})
              </NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
