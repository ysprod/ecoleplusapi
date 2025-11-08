import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Departement extends Document {
  @Prop() a?: string;
  @Prop() b?: string;
  @Prop() c?: string;
  @Prop() d?: string;
  @Prop() e?: string;
  @Prop() f?: string;
  @Prop() g?: string;
  @Prop() h?: string;
  @Prop() i?: string;
  @Prop() l?: string;
  @Prop() m?: string;
  @Prop({ type: Types.ObjectId, ref: 'Region' }) regionId?: Types.ObjectId;
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
