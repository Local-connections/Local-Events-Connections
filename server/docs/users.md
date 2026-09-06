# Users API

Handles user registration, login, and access to the currently authenticated user's information.

## Endpoints

| Method | Route       | Authentication | Description                              |
| ------ | ----------- | -------------- | ---------------------------------------- |
| `POST` | `/register` | No             | Creates a new user account               |
| `POST` | `/login`    | No             | Authenticates a user and returns a JWT   |
| `GET`  | `/me`       | Yes            | Returns the currently authenticated user |

---

## POST /register

Creates a new user account.

### Request Body

```json
{
  "name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| `name`      | String | Yes      |
| `last_name` | String | Yes      |
| `email`     | String | Yes      |
| `password`  | String | Yes      |

### Response

**201 Created**

Returns a JWT containing the new user's ID.

```text
<JWT_TOKEN>
```

---

## POST /login

Authenticates an existing user.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | String | Yes      |
| `password` | String | Yes      |

### Response

**200 OK**

Returns a JWT containing the authenticated user's ID.

```text
<JWT_TOKEN>
```

### Error

**401 Unauthorized**

Returned when the email or password is incorrect.

```text
Invalid email/password.
```

---

## GET /me

Returns the currently authenticated user's information.

### Authentication

Requires a valid JWT.

### Request Body

None.

### Response

**200 OK**

Returns the authenticated user's information.

```json
{
  "id": 1,
  "name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

### Error

**401 Unauthorized**

Returned when the request is not authenticated.

```text
Unauthorized
```
