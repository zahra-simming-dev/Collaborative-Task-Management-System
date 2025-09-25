import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { AuthModule } from "../auth/auth.module";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    AuthModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
