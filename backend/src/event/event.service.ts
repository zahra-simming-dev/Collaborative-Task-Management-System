import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventLog } from "./event.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventLog.name) private eventLogModel: Model<EventLog>
  ) {}

  async logEvent(
    action: string,
    userId: number,
    taskId: number,
    metadata?: any
  ) {
    const event = new this.eventLogModel({
      action,
      userId,
      taskId,
      metadata,
    });
    return event.save();
  }

  async getEvents() {
    return this.eventLogModel.find().sort({ timestamp: -1 }).limit(100);
  }
}
