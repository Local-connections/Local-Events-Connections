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

  return (
    <div className="event">
      <figure>
        <img className="eventImage" src={event.image_url} />
      </figure>
      <section>
        <h1>{event.title}</h1>
        <p>
          Hosted at {event.location_name}, {event.city}
        </p>
        <p>{event.description}</p>
      </section>
    </div>
  );
}
