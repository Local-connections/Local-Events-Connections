import { useState, useEffect } from "react";
import { getEvents } from "../api/events";
import EventCard from "../Components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getEvents();
      setEvents(data);
    }
    fetchEvents();
  }, []);
  return (
    <div className="homepage">
      <h2>Welcome to In Town</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
