import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/dashboard" className="brand">
          Task Manager
        </Link>
        <nav className="nav">
          {user ? (
            <div className="user-block">
              <span className="user-name">{user.name}</span>
              <button className="icon-btn" onClick={logout} title="Logout">
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                Login
              </Link>
              <Link className="btn" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}