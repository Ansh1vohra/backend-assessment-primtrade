# Backend Assessment - Task Management System

A secure and scalable full-stack application with user authentication, role-based access control, and task management features.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Role-based access control (User & Admin)
  
- **Task Management**
  - Create, read, update, and delete tasks
  - Status tracking (pending/completed)
  - User-specific task visibility
  - Admin can manage all tasks

- **Security**
  - Password encryption
  - JWT token validation
  - Input validation and sanitization
  - Rate limiting
  - Security headers with Helmet

- **Frontend**
  - React-based UI
  - Responsive design
  - Protected routes
  - User-friendly interface

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd backend-assess
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Update MongoDB URI and JWT secret
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/backend-assess
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🚀 Running the Application

### Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
# Swagger API Documentation available at http://localhost:5000/api/v1/docs
```

### Start Frontend
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 📁 Project Structure

```
backend-assess/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js   # Authentication logic
│   │   │   └── taskController.js   # Task CRUD operations
│   │   ├── middleware/
│   │   │   ├── auth.js             # JWT & RBAC middleware
│   │   │   ├── errorHandler.js     # Global error handler
│   │   │   └── validator.js        # Input validation
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   └── Task.js             # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Auth endpoints
│   │   │   └── taskRoutes.js       # Task endpoints
│   │   ├── utils/
│   │   │   ├── jwt.js              # JWT utilities
│   │   │   └── errorResponse.js    # Error response class
│   │   └── server.js               # Express app entry
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js     # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.js      # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Register.js         # Registration page
│   │   │   └── Dashboard.js        # Task dashboard
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # React entry point
│   └── package.json
│
├── API_DOCUMENTATION.md            # Complete API documentation
├── FRD.txt                         # Functional Requirements
└── README.md                       # This file
```

## 🔐 User Roles

### User (Default)
- Register and login
- View own tasks
- Create new tasks
- Update own tasks
- Cannot delete tasks

### Admin
- All user permissions
- View all tasks (from all users)
- Update any task
- Delete any task

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (Protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Admin only)

### Documentation
- `GET /api/v1/docs` - Swagger API Documentation (Interactive)

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API documentation, or visit the Swagger UI at `http://localhost:5000/api/v1/docs` when the server is running.

## 🧪 Testing

### Create Admin User
To create an admin user, register with role specified:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Test Flow
1. Register a new user
2. Login to get JWT token
3. Create tasks
4. Update task status
5. View all tasks
6. (Admin) Delete tasks

## 🛡️ Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Security Headers**: Helmet.js for HTTP security
- **CORS**: Enabled for cross-origin requests
- **Error Handling**: Centralized error handling

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Task Collection
```javascript
{
  title: String,
  description: String,
  status: String (enum: ['pending', 'completed']),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Express Validator
- Helmet
- CORS
- Rate Limiting

### Frontend
- React
- React Router
- Axios
- Context API
- CSS3

## 📝 Development Guidelines

### Code Structure
- Modular architecture
- Separation of concerns
- MVC pattern
- Middleware for reusable logic

### Best Practices
- Environment variables for configuration
- Input validation on all endpoints
- Proper HTTP status codes
- Meaningful error messages
- Async/await for asynchronous operations

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on hosting platform
2. Ensure MongoDB connection string is correct
3. Update JWT_SECRET with a strong secret
4. Set NODE_ENV to 'production'

### Frontend Deployment
1. Update API_URL in frontend/src/services/api.js
2. Build the production bundle: `npm run build`
3. Deploy build folder to hosting platform

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

### JWT Token Issues
- Ensure JWT_SECRET is set
- Check token expiration
- Verify Authorization header format

### CORS Issues
- Ensure backend CORS is configured
- Check frontend API URL

## 📄 License

This project is created for assessment purposes.

## 👥 Contact

For questions or issues, please contact the development team.

---

**Note**: Remember to change the JWT_SECRET and other sensitive information before deploying to production.
