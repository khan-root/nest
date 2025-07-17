import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: string;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
