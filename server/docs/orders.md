# Orders API

## Purpose

Provides endpoints for purchasing tickets and managing the authenticated user's orders.

## Endpoints

| Method | Route  | Auth | Description           |
| ------ | ------ | ---- | --------------------- |
| POST   | `/`    | Yes  | Purchase tickets      |
| GET    | `/`    | Yes  | Get the user's orders |
| GET    | `/:id` | Yes  | Get an order by ID    |
| PUT    | `/:id` | Yes  | Update an order       |

---

## POST `/`

Purchases tickets for an event.

**Authentication required.**

### Request Body

```json
{
  "ticket_type_id": 1,
  "quantity": 2
}
```

### Required Fields

- `ticket_type_id`
- `quantity` — positive integer

### Response `201`

Returns the created order.

```json
{
  "id": 1,
  "user_id": 5,
  "event_id": 10,
  "ticket_types_id": 1,
  "quantity": 2,
  "total_price": "20.00",
  "order_status": "confirmed"
}
```

### Errors

- `400` — Invalid quantity
- `400` — Ticket type not found
- `400` — Not enough tickets available
- `401` — User is not logged in
- Event must not have already passed

---

## GET `/`

Returns all orders belonging to the authenticated user.

**Authentication required.**

### Response `200`

Returns an array of orders containing event and ticket information.

---

## GET `/:id`

Returns a specific order belonging to the authenticated user.

**Authentication required.**

### Path Parameter

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| `id`      | Integer | Order ID    |

### Response `200`

Returns the order with event, ticket type, and location information.

### Errors

- `400` — Invalid order ID
- `401` — User is not logged in
- `403` — User does not own the order
- `404` — Order not found

---

## PUT `/:id`

Updates an order belonging to the authenticated user.

**Authentication required.**

### Path Parameter

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| `id`      | Integer | Order ID    |

### Request Body

All fields are optional.

```json
{
  "user_id": 5,
  "event_id": 10,
  "ticket_types_id": 1,
  "quantity": 2,
  "total_price": "20.00",
  "order_status": "confirmed",
  "created_at": "2026-09-05T18:00:00.000Z"
}
```

### Response `200`

Returns the updated order.

### Errors

- `400` — Invalid order ID
- `401` — User is not logged in
- `403` — User does not own the order
- `404` — Order not found
