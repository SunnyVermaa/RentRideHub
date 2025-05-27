import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo_black from "../../assets/logo_black.png"; // adjust the path if needed

const Header = () => {
  const navigate = useNavigate()
  const handleChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path); // Navigate to /users/login or /captains/login
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo_black} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Nav Links */}
        <nav className="flex space-x-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            About
          </NavLink>
          <select
      onChange={handleChange}
      defaultValue=""
      className="border border-gray-300 rounded  text-gray-700 hover:border-blue-500 focus:outline-none"
    >
      <option value="" disabled>
        Login
      </option>
      <option value="/users/login">User Login</option>
      <option value="/captains/login">Captain Login</option>
    </select>
  
    <select
      onChange={handleChange}
      defaultValue=""
      className="border border-gray-300 rounded  text-gray-700 hover:border-blue-500 focus:outline-none"
    >
      <option value="" disabled>
        Register
      </option>
      <option value="/users/register">User Register</option>
      <option value="/captains/register">Captain Register</option>
    </select>

        </nav>
      </div>
    </header>
  );
};

export default Header;
