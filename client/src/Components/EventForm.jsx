import { useState } from "react";

export default function EventForm({
  onSubmit,
  initialData = {},
  buttonText = "Create Event",
}) {
  const [isFree, setIsFree] = useState(initialData.is_free ?? null);

  const [ticketTypes, setTicketTypes] = useState(
    initialData.ticket_types?.length > 0
      ? initialData.ticket_types
      : [
          {
            name: "",
            price: "",
            quantity: "",
          },
        ],
  );

  function addTicketType() {
    setTicketTypes([
      ...ticketTypes,
      {
        name: "",
        price: "",
        quantity: "",
      },
    ]);
  }

  function removeTicketType(index) {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  }

  function handleTicketChange(index, field, value) {
    const updatedTickets = [...ticketTypes];

    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: value,
    };

    setTicketTypes(updatedTickets);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      event_date: formData.get("event_date"),
      event_time: formData.get("event_time"),
      image_url: formData.get("image_url") || null,
      is_free: isFree,
    };

    if (isFree === false) {
      eventData.ticket_types = ticketTypes.map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      price: Number(ticket.price),
      quantity: Number(ticket.quantity),
    }));
    }

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
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            defaultValue={initialData.title || ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Description:
          <textarea
            name="description"
            defaultValue={initialData.description || ""}
            required
          />
        </label>
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            defaultValue={initialData.address || ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            defaultValue={initialData.city || ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          State:
          <input
            type="text"
            name="state"
            defaultValue={initialData.state || ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            defaultValue={initialData.zip || ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            defaultValue={initialData.image_url || ""}
          />
        </label>
      </div>

      <div className="event-type-section">
        <p>Event Type:</p>

        <div className="event-type-options">
          <div className="event-type-choice">
            <input
              type="radio"
              id="free-event"
              name="event_type"
              value="free"
              checked={isFree === true}
              onChange={() => setIsFree(true)}
              required
            />
            <span>Free Event</span>
          </div>

          <div className="event-type-choice">
            <input
              type="radio"
              id="paid-event"
              name="event_type"
              value="paid"
              checked={isFree === false}
              onChange={() => setIsFree(false)}
              required
            />
            <span>Paid Event</span>
          </div>
        </div>
      </div>

      {isFree === false && (
        <div>
          <h3>Ticket Information</h3>

          {ticketTypes.map((ticket, index) => (
            <div key={index}>
              <h4>Ticket Type {index + 1}</h4>

              <div>
                <label>
                  Ticket Name:
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(event) =>
                      handleTicketChange(
                        index,
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="General Admission"
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Price:
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(event) =>
                      handleTicketChange(
                        index,
                        "price",
                        event.target.value,
                      )
                    }
                    min="0"
                    step="0.01"
                    placeholder="20.00"
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={ticket.quantity}
                    onChange={(event) =>
                      handleTicketChange(
                        index,
                        "quantity",
                        event.target.value,
                      )
                    }
                    min="0"
                    step="1"
                    placeholder="100"
                    required
                  />
                </label>
              </div>

              {ticketTypes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicketType(index)}
                >
                  Remove Ticket Type
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addTicketType}>
            + Add Ticket Type
          </button>
        </div>
      )}

      <br />

      <button type="submit">{buttonText}</button>
    </form>
  );
}