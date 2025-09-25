import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task, TaskStatus } from "./task.entity";
import { User } from "../auth/user.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(title: string, description: string, assignedToId?: number) {
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.TODO,
      assignedTo: assignedToId ? { id: assignedToId } as User : undefined,
    });

    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: ["assignedTo"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ["assignedTo"],
    });
  }

  async update(id: number, updates: any) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error("Task not found");
    }

    // Handle assignment
    if (updates.assignedToId !== undefined) {
      if (updates.assignedToId) {
        const user = await this.userRepository.findOne({ where: { id: updates.assignedToId } });
        if (user) {
          task.assignedTo = user;
        }
      } else {
        task.assignedTo = null;
      }
      delete updates.assignedToId;
    }

    // Update other fields
    Object.assign(task, updates);
    return await this.taskRepository.save(task);
  }

  async delete(id: number) {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }

  async assignTask(taskId: number, userId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!task || !user) {
      throw new Error("Task or user not found");
    }

    task.assignedTo = user;
    return await this.taskRepository.save(task);
  }
}
