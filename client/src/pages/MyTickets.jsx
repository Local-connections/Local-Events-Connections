import { useState, useEffect } from "react";
import { Link } from "react-router"; 
import { getMyOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return; 

    async function fetchOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]); 

  
  if (!user) return <p>Please log in to see your orders.</p>;
  if (loading) return <p>Loading orders…</p>;
  if (error) return <p className="error">{error}</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;


  return (
    <div className="orders-page">
      <h2>{user.name} Orders</h2>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <Link to={`/orders/${order.id}`}>
              <strong>{order.event_title}</strong> - {order.ticket_type_name}
            </Link>
            <p>Quantity: {order.quantity} | Total: ${order.total_price}</p>
            <p>Status: {order.order_status} | Ordered: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Order ID: {order.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}