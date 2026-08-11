import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orders";

export default function PurchaseForm({ ticketTypes }) {
  return (
    <div className="purchase-form">
      <h3>Select Tickets</h3>
      {!ticketTypes || ticketTypes.length === 0 ? (
        <p>No tickets available for this event.</p>
      ) : (
        <div className="tickets-grid">
          {ticketTypes.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket }) {
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const maxAvailable = ticket.quantity ?? 99;

  const handleBuy = async () => {
    if (!user) {
      setMessage({ type: "error", text: "You must be logged in to buy tickets." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const order = await createOrder(ticket.id, quantity);
      setMessage({ type: "success", text: `Order #${order.id} confirmed!` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Purchase failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-card">
      <h4>{ticket.name}</h4>
      <p className="ticket-price">${Number(ticket.price).toFixed(2)}</p>
      <p className="ticket-stock">
        {ticket.quantity === null
          ? "Unlimited available"
          : `${ticket.quantity} left`}
      </p>

      <div className="quantity-row">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={loading}
        >
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity(Math.min(maxAvailable, quantity + 1))}
          disabled={loading}
        >
          +
        </button>
      </div>

      <button
        className="buy-btn"
        onClick={handleBuy}
        disabled={loading || (ticket.quantity !== null && ticket.quantity === 0)}
      >
        {loading ? "Processing…" : ticket.quantity === 0 ? "Sold Out" : "Buy"}
      </button>

      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
}