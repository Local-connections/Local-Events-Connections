import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getEventById, updateEvent } from "../api/events";
import { createLocation } from "../api/locations";
import EventForm from "../Components/EventForm";

export default function EditEvent() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

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

  async function handleUpdateEvent(eventData, locationData) {
    try {
      const location = await createLocation(
        locationData,
        user.token,
      );

      const updatedEventData = {
        ...eventData,
        location_id: location.id,
      };

      const updatedEvent = await updateEvent(
        id,
        updatedEventData,
        user.token,
      );

      console.log("Event updated:", updatedEvent);

      navigate("/");
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  }

  if (!event) {
    return <p>Loading event...</p>;
  }

  return (
    <div>
      <h2>Edit Event</h2>

      <EventForm
        onSubmit={handleUpdateEvent}
        initialData={event}
        buttonText="Update Event"
      />
    </div>
  );
}