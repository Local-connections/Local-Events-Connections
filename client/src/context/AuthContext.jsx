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

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}