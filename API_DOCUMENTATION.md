# Backend Assessment API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user", can be "admin"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### 2. Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User
**GET** `/auth/me`

Get the currently logged-in user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Task Endpoints

### 1. Get All Tasks
**GET** `/tasks`

Get all tasks. Users see only their tasks, admins see all tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64abc456...",
      "title": "Complete project",
      "description": "Finish the backend assessment",
      "status": "pending",
      "createdBy": {
        "_id": "64abc123...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Task
**GET** `/tasks/:id`

Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64abc456...",
    "title": "Complete project",
    "description": "Finish the backend assessment",
    "status": "pending",
    "createdBy": {
      "_id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to access this task"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 3. Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the backend assessment",
  "status": "pending" // optional, defaults to "pending"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "64abc456...",
    "title": "Complete project",
    "description": "Finish the backend assessment",
    "status": "pending",
    "createdBy": "64abc123...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

---

### 4. Update Task
**PUT** `/tasks/:id`

Update a task. Users can update their own tasks, admins can update any task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "64abc456...",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "createdBy": "64abc123...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this task"
}
```

---

### 5. Delete Task
**DELETE** `/tasks/:id`

Delete a task. **Only admins can delete tasks.**

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to delete tasks"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Status Codes

- **200** - Success
- **201** - Resource Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

---

## Role-Based Access Control

### User Role
- ✅ Register and login
- ✅ View their own tasks
- ✅ Create tasks
- ✅ Update their own tasks
- ❌ Delete tasks
- ❌ View other users' tasks

### Admin Role
- ✅ All user permissions
- ✅ View all tasks
- ✅ Update any task
- ✅ Delete any task

---

## Rate Limiting

API requests are limited to **100 requests per 15 minutes** per IP address.

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Task","description":"Task description","status":"pending"}'
```

### Get All Tasks
```bash
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/v1/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"completed"}'
```

### Delete Task (Admin only)
```bash
curl -X DELETE http://localhost:5000/api/v1/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```
