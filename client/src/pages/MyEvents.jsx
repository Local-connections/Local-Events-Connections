import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyEvents } from "../api/events";
import EventCard from "../Components/EventCard";

export default function MyEvents() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadMyEvents() {
      try {
        const data = await getMyEvents(user.token);
        setEvents(data);
      } catch (error) {
        console.error("Failed to load my events:", error);
      }
    }

    if (user) {
      loadMyEvents();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to see your events.</p>;
  }

  return (
    <div>
      <h2>My Events</h2>

      {events.length === 0 ? (
        <p>You have not created any events yet.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
}