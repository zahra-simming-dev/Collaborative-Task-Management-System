import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class EventLog extends Document {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  taskId: number;

  @Prop({ type: Object })
  metadata: any;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
