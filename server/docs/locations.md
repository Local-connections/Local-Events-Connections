# Locations API

## Purpose

Provides endpoints for retrieving and creating event locations.

## Endpoints

| Method | Route  | Auth | Description           |
| ------ | ------ | ---- | --------------------- |
| GET    | `/`    | No   | Get all locations     |
| GET    | `/:id` | No   | Get a location by ID  |
| POST   | `/`    | Yes  | Create a new location |

---

## GET `/`

Returns all locations.

### Response `200`

```json
[
  {
    "id": 1,
    "name": "Lincoln Center",
    "address": "123 Main St",
    "city": "Fort Collins",
    "state": "CO",
    "zip": 80521
  }
]
```

---

## GET `/:id`

Returns a location by ID.

### Path Parameter

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| `id`      | Integer | Location ID |

### Response `200`

Returns the location object.

### Error `404`

```text
Location not found
```

---

## POST `/`

Creates a new location.

**Authentication required.**

### Request Body

```json
{
  "name": "Lincoln Center",
  "address": "123 Main St",
  "city": "Fort Collins",
  "state": "CO",
  "zip": 80521
}
```

### Required Fields

* `name`
* `city`
* `state`
* `zip`

### Optional Fields

* `address`

### Response `201`

Returns the newly created location.

### Error `401`

```text
Unauthorized
```
