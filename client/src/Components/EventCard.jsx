import { Link } from "react-router";
import defaultImage from "../assets/defaultEventImage.png";

export default function EventCard({ event }) {
  const imageSrc = event.image_url || defaultImage;

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="event-card">
      <img src={imageSrc} alt={event.title} />
      <h3><Link to={`/events/${event.id}`}>{event.title}</Link></h3>
      <p>{event.description}</p>
      <p>Date: {formattedDate}</p>
      <p>Location: {event.location_name}, {event.city}</p>
      <p>Time: {formattedTime}</p>
      {event.is_free ? <p>Free Event</p> : <p>Paid Event</p>}
    </div>
  );
}
