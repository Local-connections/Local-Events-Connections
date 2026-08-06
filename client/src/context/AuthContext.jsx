import { createContext, useContext, useState } from "react";
import { registerUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function register(userData) {
    const token = await registerUser(userData);
    localStorage.setItem("token", token);
    setUser({ token });
  }

   const value = {
    register,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}