const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "ctms",
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "name" VARCHAR NOT NULL,
        "role" VARCHAR NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tasks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "task" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "description" TEXT,
        "status" VARCHAR NOT NULL DEFAULT 'todo',
        "assignedToId" INTEGER REFERENCES "user"("id") ON DELETE SET NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if users already exist
    const userCount = await client.query('SELECT COUNT(*) FROM "user"');
    if (userCount.rows[0].count > 0) {
      console.log("Database already seeded");
      return;
    }

    // Hash password
    const defaultPassword = process.env.DEFAULT_USER_PASSWORD || "changeme123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Insert users
    const users = [
      {
        email: "admin@test.com",
        password: hashedPassword,
        name: "Admin User",
        role: "admin",
      },
      {
        email: "user@test.com",
        password: hashedPassword,
        name: "Regular User",
        role: "user",
      },
      {
        email: "john@test.com",
        password: hashedPassword,
        name: "John Doe",
        role: "user",
      },
    ];

    for (const user of users) {
      await client.query(
        'INSERT INTO "user" (email, password, name, role) VALUES ($1, $2, $3, $4)',
        [user.email, user.password, user.name, user.role]
      );
    }

    // Insert sample tasks
    const tasks = [
      {
        title: "Setup Development Environment",
        description:
          "Install Node.js, PostgreSQL, and configure the application",
        status: "done",
        assignedToId: 1,
      },
      {
        title: "Implement User Authentication",
        description: "Create login and registration functionality with JWT",
        status: "in_progress",
        assignedToId: 2,
      },
      {
        title: "Design Task Management UI",
        description: "Create responsive task dashboard with CRUD operations",
        status: "todo",
        assignedToId: 3,
      },
      {
        title: "Implement Real-time Updates",
        description: "Add WebSocket support for live task updates",
        status: "todo",
      },
      {
        title: "Write Unit Tests",
        description: "Create comprehensive test suite for backend and frontend",
        status: "todo",
        assignedToId: 1,
      },
    ];

    for (const task of tasks) {
      await client.query(
        'INSERT INTO "task" (title, description, status, "assignedToId") VALUES ($1, $2, $3, $4)',
        [task.title, task.description, task.status, task.assignedToId]
      );
    }

    console.log("Database seeded successfully!");
    console.log("Test credentials:");
    console.log(`Admin: admin@test.com / ${defaultPassword}`);
    console.log(`User: user@test.com / ${defaultPassword}`);
    console.log(`User: john@test.com / ${defaultPassword}`);
    console.log("⚠️  IMPORTANT: Change these passwords in production!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

seedDatabase();
