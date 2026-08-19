import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getEventById,
  deleteEvent,
  rescheduleEvent,
} from "../api/events";

export default function ManageEvent() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event:", error);
      }
    }

    loadEvent();
  }, [id]);

  async function handleReschedule(e) {
    e.preventDefault();

    try {
      await rescheduleEvent(
        id,
        {
          event_date: newDate,
          event_time: newTime,
        },
        user.token,
      );

      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Failed to reschedule event:", error);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEvent(id, user.token);
      navigate("/my-events");
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  }

  if (!event) {
    return <p>Loading event...</p>;
  }

  if (!user || Number(event.organizer_id) !== Number(user.id)) {
    return <p>You are not allowed to manage this event.</p>;
  }

  return (
    <div>
      <h2>Manage Event</h2>

      <h3>{event.title}</h3>

      <Link to={`/events/${id}/edit`}>
        <button>Edit Event</button>
      </Link>

      <h3>Reschedule Event</h3>

      <form onSubmit={handleReschedule}>
        <label>
          New Date:
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </label>

        <label>
          New Time:
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            required
          />
        </label>

        <button type="submit">Reschedule Event</button>
      </form>

      <h3>Delete Event</h3>

      <button onClick={handleDelete}>
        Delete Event
      </button>
    </div>
  );
}