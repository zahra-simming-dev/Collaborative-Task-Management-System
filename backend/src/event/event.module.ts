import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventService } from "./event.service";
import { EventLog, EventLogSchema } from "./event.schema";
import { TaskGateway } from "./task.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
    ]),
  ],
  providers: [EventService, TaskGateway],
  exports: [EventService, TaskGateway],
})
export class EventModule {}
