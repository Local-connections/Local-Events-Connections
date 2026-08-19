import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getEventById, getTicketTypes, deleteEvent } from "../api/events";
import { useAuth } from "../context/AuthContext";
import PurchaseForm from "../Components/PurchaseForm";
import defaultImage from "../assets/defaultEventImage.png";

export default function EventDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
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

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token");
      await deleteEvent(id, token);
      console.log("Event deleted");
      nav("/");
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }

  const refreshTicketTypes = async () => {
    try {
      const data = await getTicketTypes(id);
      setTicketTypes(data);
    } catch (err) {
      console.error("Failed to refresh ticket types:", err);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Loading...</p>;

  const eventDateTime = new Date(`${event.event_date}T${event.event_time}`);
  const isPastEvent = eventDateTime < new Date();

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
        <p>Hosted at the {event.location_name}</p>
        <p>
          Address: {event.address} {event.city}, {event.state} {event.zip}
        </p>
        <p>
          Hosted at {formattedTime} on {formattedDate}
        </p>
        <p>{event.description}</p>
        <p className={event.is_free ? "free-event" : "paid-event"}>
          {event.is_free ? "Free Event" : "Paid Event"}
        </p>

        {user && Number(event.organizer_id) === Number(user.id) && (
          <>
            <Link to={`/events/${id}/edit`}>
              <button>Edit Event</button>
            </Link>
            <button onClick={handleDelete}>Delete Event</button>
          </>
        )}
      </section>

      <PurchaseForm
        ticketTypes={ticketTypes}
        onPurchaseSuccess={refreshTicketTypes}
        isPastEvent={isPastEvent}
      />
    </div>
  );
}