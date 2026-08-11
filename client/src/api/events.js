import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function createEvent(eventData, token) {
  const { data } = await axios.post(
    `${API}/events`,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
}

export const getEvents = async () => {
  const {data} = await axios.get(`${API}/events`);
  return data;
};

