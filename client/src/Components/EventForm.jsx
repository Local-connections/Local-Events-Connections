export default function EventForm({
  onSubmit,
  initialData = {},
  buttonText = "Create Event",
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      event_date: formData.get("event_date"),
      event_time: formData.get("event_time"),
      image_url: formData.get("image_url") || null,
      is_free: formData.get("is_free") === "on",
    };

    const locationData = {
      name: formData.get("address"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
    };

    onSubmit(eventData, locationData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          defaultValue={initialData.title || ""}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          defaultValue={initialData.description || ""}
          required
        ></textarea>
      </label>

      <label>
        Event Date:
        <input
          type="date"
          name="event_date"
          defaultValue={
            initialData.event_date
              ? initialData.event_date.slice(0, 10)
              : ""
          }
          required
        />
      </label>

      <label>
        Event Time:
        <input
          type="time"
          name="event_time"
          defaultValue={
            initialData.event_time
              ? initialData.event_time.slice(0, 5)
              : ""
          }
          required
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          defaultValue={initialData.address || ""}
          required
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="city"
          defaultValue={initialData.city || ""}
          required
        />
      </label>

      <label>
        State:
        <input
          type="text"
          name="state"
          defaultValue={initialData.state || ""}
          required
        />
      </label>

      <label>
        ZIP Code:
        <input
          type="text"
          name="zip"
          defaultValue={initialData.zip || ""}
          required
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          name="image_url"
          defaultValue={initialData.image_url || ""}
        />
      </label>

      <label>
        Free Event:
        <input
          type="checkbox"
          name="is_free"
          defaultChecked={initialData.is_free || false}
        />
      </label>

      <button type="submit">{buttonText}</button>
    </form>
  );
}