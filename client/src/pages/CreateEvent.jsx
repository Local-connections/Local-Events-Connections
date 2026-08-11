import { useAuth } from "../context/AuthContext";
import { createEvent } from "../api/events";
import EventForm from "../Components/EventForm";
import { useNavigate } from "react-router";

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCreateEvent(eventData) {
    try {
      const newEvent = await createEvent(eventData, user.token);

      console.log("Event created:", newEvent);

      navigate("/");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  }

  return (
    <div>
      <h2>Create Event</h2>
      <EventForm onSubmit={handleCreateEvent} />
    </div>
  );
}