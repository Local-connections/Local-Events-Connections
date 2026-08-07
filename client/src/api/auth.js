import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
  const { data } = await axios.post(`${API}/users/register`, userData);
  return data;
}

export async function loginUser(userData) {
  const { data } = await axios.post(`${API}/users/login`, userData);
  return data;
}
