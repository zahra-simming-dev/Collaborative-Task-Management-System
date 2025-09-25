import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TaskService } from "./task.service";
import { TaskStatus } from "./task.entity";

@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(
    @Body() body: { title: string; description?: string; assignedToId?: number }
  ) {
    return this.taskService.create(
      body.title,
      body.description,
      body.assignedToId
    );
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      status?: TaskStatus;
      assignedToId?: number;
    }
  ) {
    return this.taskService.update(+id, body);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.taskService.delete(+id);
  }

  @Put(":id/assign")
  async assignTask(@Param("id") id: string, @Body() body: { userId: number }) {
    return this.taskService.assignTask(+id, body.userId);
  }
}
