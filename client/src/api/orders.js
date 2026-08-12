import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function createOrder(ticketTypeId, quantity) {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    `${API}/orders`,
    { ticket_type_id: ticketTypeId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}