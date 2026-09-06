# Events API

Handles event creation, retrieval, updates, rescheduling, and deletion, including event ticket types and categories.

## Endpoints

| Method   | Route                    | Authentication | Description                                |
| -------- | ------------------------ | -------------- | ------------------------------------------ |
| `GET`    | `/`                      | No             | Returns all events                         |
| `POST`   | `/`                      | Yes            | Creates a new event                        |
| `GET`    | `/:eventId/ticket-types` | No             | Returns ticket types for an event          |
| `GET`    | `/my`                    | Yes            | Returns events created by the current user |
| `PUT`    | `/:id/reschedule`        | Yes            | Reschedules an event                       |
| `PUT`    | `/:id`                   | Yes            | Updates an event                           |
| `DELETE` | `/:id`                   | Yes            | Deletes an event                           |
| `GET`    | `/:id`                   | No             | Returns a specific event                   |

---

## GET /

Returns all events ordered by event date and time.

### Response

**200 OK**

Returns an array of events containing event information, location information, and categories.

```json
[
  {
    "id": 1,
    "title": "Community Festival",
    "description": "Annual community festival.",
    "event_date": "2026-06-15",
    "event_time": "14:00:00",
    "location_id": 1,
    "location_name": "City Park",
    "city": "Fort Collins",
    "state": "CO",
    "image_url": "https://example.com/image.jpg",
    "organizer_id": 1,
    "is_free": true,
    "categories": ["Community", "Festival"]
  }
]
```

---

## POST /

Creates a new event for the authenticated user.

### Authentication

Requires a valid JWT.

### Request Body

```json
{
  "title": "Community Festival",
  "description": "Annual community festival.",
  "event_date": "2026-06-15",
  "event_time": "14:00",
  "location_id": 1,
  "image_url": "https://example.com/image.jpg",
  "is_free": true,
  "category_ids": [1, 2],
  "ticket_types": [
    {
      "name": "General Admission",
      "price": 10.00,
      "quantity": 100
    }
  ]
}
```

### Required Fields

| Field          | Type      | Required |
| -------------- | --------- | -------- |
| `title`        | String    | Yes      |
| `description`  | String    | Yes      |
| `event_date`   | Date      | Yes      |
| `event_time`   | Time      | Yes      |
| `location_id`  | Integer   | Yes      |
| `is_free`      | Boolean   | Yes      |
| `image_url`    | String    | No       |
| `category_ids` | Integer[] | No       |
| `ticket_types` | Object[]  | No       |

Each ticket type may contain:

| Field      | Type    | Required |
| ---------- | ------- | -------- |
| `name`     | String  | Yes      |
| `price`    | Number  | Yes      |
| `quantity` | Integer | No       |

### Response

**201 Created**

Returns the newly created event, including the supplied categories and ticket types.

---

## GET /:eventId/ticket-types

Returns the ticket types associated with an event.

### Path Parameter

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `eventId` | Integer | ID of the event |

### Response

**200 OK**

```json
[
  {
    "id": 1,
    "name": "General Admission",
    "price": 10.00,
    "quantity": 100
  }
]
```

### Errors

**400 Bad Request**

Returned when the event ID is not a positive integer.

**404 Not Found**

Returned when the event does not exist.

---

## GET /my

Returns events created by the currently authenticated user.

### Authentication

Requires a valid JWT.

### Response

**200 OK**

Returns an array of events belonging to the authenticated user.

### Error

**401 Unauthorized**

```json
{
  "error": "You must be logged in."
}
```

---

## PUT /:id/reschedule

Changes the date and time of an event.

### Authentication

Requires a valid JWT. Only the event organizer can reschedule the event.

### Path Parameter

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `id`      | Integer | ID of the event |

### Request Body

```json
{
  "event_date": "2026-06-20",
  "event_time": "15:00"
}
```

Both `event_date` and `event_time` are required.

### Restrictions

* The event must exist.
* The authenticated user must be the event organizer.
* The event cannot be rescheduled within 24 hours of its scheduled start time.

The previous date and time are stored in `previous_event_date` and `previous_event_time`, and `is_rescheduled` is set to `true`.

### Response

**200 OK**

Returns the updated event.

### Errors

| Status | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `400`  | Invalid event ID or missing date/time                       |
| `401`  | User is not authenticated                                   |
| `403`  | User is not the event organizer or event is within 24 hours |
| `404`  | Event does not exist                                        |

---

## PUT /:id

Updates an existing event.

### Authentication

Requires a valid JWT. Only the event organizer can update the event.

### Path Parameter

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `id`      | Integer | ID of the event |

### Request Body

Fields are optional. Fields not provided retain their current values.

```json
{
  "title": "Updated Festival",
  "description": "Updated description.",
  "event_date": "2026-06-20",
  "event_time": "15:00",
  "location_id": 2,
  "image_url": "https://example.com/new-image.jpg",
  "is_free": false,
  "ticket_types": [
    {
      "id": 1,
      "name": "General Admission",
      "price": 15.00,
      "quantity": 100
    },
    {
      "name": "VIP",
      "price": 30.00,
      "quantity": 25
    }
  ]
}
```

Existing ticket types can be updated by providing their `id`. A new ticket type is created when no `id` is provided.

### Restrictions

* The event must exist.
* The authenticated user must be the event organizer.
* The event cannot be updated within 24 hours of its scheduled start time.

### Response

**200 OK**

Returns the updated event.

### Errors

| Status | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `400`  | Invalid event ID                                            |
| `401`  | User is not authenticated                                   |
| `403`  | User is not the event organizer or event is within 24 hours |
| `404`  | Event does not exist                                        |

---

## DELETE /:id

Deletes an event.

### Authentication

Requires a valid JWT. Only the event organizer can delete the event.

### Path Parameter

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `id`      | Integer | ID of the event |

### Restrictions

* The event must exist.
* The authenticated user must be the event organizer.
* The event cannot be deleted within 24 hours of its scheduled start time.

### Response

**204 No Content**

The event was successfully deleted.

### Errors

| Status | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `400`  | Invalid event ID                                            |
| `401`  | User is not authenticated                                   |
| `403`  | User is not the event organizer or event is within 24 hours |
| `404`  | Event does not exist                                        |

---

## GET /:id

Returns a specific event by ID.

### Path Parameter

| Parameter | Type    | Description     |
| --------- | ------- | --------------- |
| `id`      | Integer | ID of the event |

### Response

**200 OK**

Returns the event and its location information.

```json
{
  "id": 1,
  "title": "Community Festival",
  "description": "Annual community festival.",
  "event_date": "2026-06-15",
  "event_time": "14:00:00",
  "location_id": 1,
  "location_name": "City Park",
  "address": "123 Main St",
  "city": "Fort Collins",
  "state": "CO",
  "zip": 80521,
  "image_url": "https://example.com/image.jpg",
  "organizer_id": 1,
  "is_free": true
}
```

### Errors

**400 Bad Request**

Returned when the event ID is not a positive integer.

**404 Not Found**

```json
{
  "error": "Event not found."
}
```
