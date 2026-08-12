import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function createEvent(eventData, token) {
  const { data } = await axios.post(`${API}/events`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export const getEvents = async () => {
  const { data } = await axios.get(`${API}/events`);
  return data;
};

export async function getEvent(id) {
  try {
    const response = await fetch(API + "/events/" + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
