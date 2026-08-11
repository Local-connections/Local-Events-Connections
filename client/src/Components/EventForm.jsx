export default function EventForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      event_date: formData.get("event_date"),
      event_time: formData.get("event_time"),
      location_id: Number(formData.get("location_id")),
      image_url: formData.get("image_url") || null,
      is_free: formData.get("is_free") === "on",
    };

    onSubmit(eventData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" required />
      </label>

      <label>
        Description:
        <textarea name="description" required></textarea>
      </label>

      <label>
        Event Date:
        <input type="date" name="event_date" required />
      </label>

      <label>
        Event Time:
        <input type="time" name="event_time" required />
      </label>

      <label>
        Location ID:
        <input type="number" name="location_id" required />
      </label>

      <label>
        Image URL:
        <input type="text" name="image_url" />
      </label>

      <label>
        Free Event:
        <input type="checkbox" name="is_free" />
      </label>

      <button type="submit">Create Event</button>
    </form>
  );
}