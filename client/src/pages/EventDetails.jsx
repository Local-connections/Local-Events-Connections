import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getEventById } from "../api/events";
import { useAuth } from "../context/AuthContext";

export default function Event() {
  //   const { token } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncEvent = async () => {
      const data = await getEventById(id);
      setEvent(data);
    };
    syncEvent();
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const formattedTime = new Date(
    `1970-01-01T${event.event_time}`,
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="event">
      <figure>
        <img className="eventImage" src={event.image_url} />
      </figure>
      <section>
        <h1>{event.title}</h1>
        <p>
          Hosted in {event.location_name}, {event.city}
        </p>
        <p>
          Hosted at {formattedTime} on {formattedDate}
        </p>
        <p>{event.description}</p>
        {event.is_free ? <p>Free Event</p> : <p>Paid Event</p>}
      </section>
    </div>
  );
}
