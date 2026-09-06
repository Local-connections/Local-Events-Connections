# Categories API

## Purpose

Provides event categories for use when browsing and filtering events.

## Endpoints

| Method | Route | Auth | Description              |
| ------ | ----- | ---- | ------------------------ |
| GET    | `/categories/`   | No   | Get all event categories |

---

## GET `/categories/`

Returns all event categories, ordered alphabetically by name.

### Response `200`

```json
[
  {
    "id": 1,
    "name": "Concerts"
  },
  {
    "id": 2,
    "name": "Cultural"
  },
  {
    "id": 3,
    "name": "Sales"
  }
]
```
