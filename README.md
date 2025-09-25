# Collaborative Task Management System

A modern task management application built with Next.js, NestJS, and TypeScript. Create, assign, and track tasks with a clean, responsive interface.

## Features

- **User Authentication**: Secure login and registration with JWT
- **Task Management**: Create, edit, delete, and assign tasks
- **Status Tracking**: Move tasks between To Do, In Progress, and Done
- **User Assignment**: Assign tasks to team members
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live updates across all connected users

## Tech Stack

**Backend**: NestJS, TypeScript, PostgreSQL, MongoDB, JWT, WebSockets  
**Frontend**: Next.js, TypeScript, Tailwind CSS, React Query  
**Database**: PostgreSQL (relational data), MongoDB (event logging)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd CTMS
   ```

2. Install dependencies

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Start the application

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run start:dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

### Test Credentials

After running the seed script, check the console output for test user credentials.

### Database Setup (Optional)

To use real databases instead of in-memory storage:

1. Install PostgreSQL and MongoDB
2. Create a `backend/.env` file with your database credentials:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your-database-password
   DB_NAME=ctms
   MONGODB_URI=mongodb://localhost:27017/ctms-events
   JWT_SECRET=your-jwt-secret
   DEFAULT_USER_PASSWORD=your-test-password
   NODE_ENV=development
   PORT=3001
   ```

3. Run the seed script to populate the database:
   ```bash
   cd backend
   npm run seed
   ```

## Usage

- **Create Tasks**: Click the "Create New Task" button to add new tasks
- **Edit Tasks**: Click the edit button to modify task details
- **Change Status**: Use the dropdown to move tasks between To Do, In Progress, and Done
- **Assign Tasks**: Assign tasks to team members during creation or editing
- **Delete Tasks**: Admins can delete tasks using the delete button

### User Roles

- **Admin**: Can create, edit, delete, and assign any task
- **User**: Can create tasks and edit assigned tasks

## API Endpoints

**Authentication**

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile
- `GET /auth/users` - Get all users

**Tasks**

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task (Admin only)
- `PUT /tasks/:id/assign` - Assign task to user

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Project Structure

```
CTMS/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/     # Authentication
│   │   ├── task/     # Task management
│   │   └── event/    # WebSocket events
│   └── seed-database.js
├── frontend/         # Next.js app
│   ├── src/
│   │   ├── app/      # Pages
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Security

- Never commit `.env` files
- Change default passwords before production
- Use strong JWT secrets
- Keep database credentials secure

## License

MIT License
