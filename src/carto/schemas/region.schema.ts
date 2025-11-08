import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Region extends Document {
  @Prop({ type: String }) a?: string;
  @Prop() b?: string;
  @Prop({ required: true }) c: string;
  @Prop() d?: string;
  @Prop() e?: string;
  @Prop() f?: string;
  @Prop({ required: true }) g: string;
  @Prop() h?: string;
  @Prop() i?: string;
  @Prop() l?: string;
  @Prop() m?: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
