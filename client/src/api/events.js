import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getEvents = async () => {
  const {data} = await axios.get(`${API}/events`);
  return data;
};

