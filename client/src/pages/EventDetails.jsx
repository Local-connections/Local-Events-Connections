import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventById, getTicketTypes } from "../api/events";
import PurchaseForm from "../Components/PurchaseForm";
import defaultImage from "../assets/defaultEventImage.png";

export default function EventDetails() {
  //   const { token } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventData, ticketData] = await Promise.all([
          getEventById(id),
          getTicketTypes(id),
        ]);
        setEvent(eventData);
        setTicketTypes(ticketData);
      } catch (err) {
        setError("Failed to load event details.");
        console.error(err);
      }
    }
    loadData();
  }, [id]);

  if (error)
    return <p className="error">{error}</p>;
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
        <img
          className="eventImage"
          src={event.image_url || defaultImage}
          alt={event.title}
        />
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
      <PurchaseForm ticketTypes={ticketTypes} />
    </div>
  );
}
