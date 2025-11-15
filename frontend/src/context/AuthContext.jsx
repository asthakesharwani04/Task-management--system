import React, { createContext, useContext, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("tms_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (email, password) => {
    const res = await api.post("/api/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("tms_token", token);
    localStorage.setItem("tms_user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  const register = async (name, email, password) => {
    await api.post("/api/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("tms_token");
    localStorage.removeItem("tms_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}