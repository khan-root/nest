import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true, index: true })
  userName: string;

  @Prop()
  displayName?: string;

  @Prop()
  avatar?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

// 2. Create a Document type
export type UserDocument = User & Document;

// 3. Generate the actual schema
export const UserSchema = SchemaFactory.createForClass(User);
