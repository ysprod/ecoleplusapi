import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Coges {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true, unique: true })
  school: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Parent' }], default: [] })
  parents: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Parent' })
  president: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Parent' })
  treasurer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Parent' })
  secretary: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export type CogesDocument = Coges & Document;
export const CogesSchema = SchemaFactory.createForClass(Coges);