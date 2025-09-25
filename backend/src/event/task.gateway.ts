import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { EventService } from "./event.service";
import { forwardRef, Inject } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  constructor(private eventService: EventService) {}

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string
  ) {
    client.join(room);
    return { event: "joinedRoom", room };
  }

  async notifyTaskUpdate(
    taskId: number,
    action: string,
    task: any,
    userId: number
  ) {
    // Log the event
    await this.eventService.logEvent(action, userId, taskId, { task });

    // Broadcast to all connected clients
    this.server.emit("taskUpdated", {
      action,
      taskId,
      task,
      timestamp: new Date(),
    });
  }

  async notifyTaskAssignment(taskId: number, task: any, userId: number) {
    await this.eventService.logEvent("task_assigned", userId, taskId, { task });

    this.server.emit("taskAssigned", {
      taskId,
      task,
      timestamp: new Date(),
    });
  }
}
