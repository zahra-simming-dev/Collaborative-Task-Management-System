import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
import { EventModule } from "./event/event.module";
import { User } from "./auth/user.entity";
import { Task } from "./task/task.entity";

@Module({
  imports: [
    // PostgreSQL Configuration
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "ctms",
      entities: [User, Task],
      synchronize: process.env.NODE_ENV !== "production", // Auto-create tables in development
      logging: process.env.NODE_ENV === "development",
    }),

    // MongoDB Configuration
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ctms-events"
    ),

    // Application Modules
    AuthModule,
    TaskModule,
    EventModule,
  ],
})
export class AppModule {}
