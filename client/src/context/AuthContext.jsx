import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (token) {
      return { token };
    }

    return null;
  });

  async function register(userData) {
    const token = await registerUser(userData);
    localStorage.setItem("token", token);
    setUser({ token });
  }

  async function login(userData) {
    const token = await loginUser(userData);
    localStorage.setItem("token", token);
    setUser({ token });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    login,
    register,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
