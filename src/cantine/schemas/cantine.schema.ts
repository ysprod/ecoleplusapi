import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Cantine extends Document {
  @Prop({ type: Date, required: true, index: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop({
    type: {
      entree: { type: String, trim: true },
      platPrincipal: { type: String, required: true, trim: true },
      accompagnement: { type: String, trim: true },
      dessert: { type: String, trim: true },
    },
    required: true,
  })
  menu: {
    entree?: string;
    platPrincipal: string;
    accompagnement?: string;
    dessert?: string;
  };

  @Prop({ type: Number, required: true, min: 0 })
  prix: number;

  @Prop({ type: Number, default: 0, min: 0 })
  nombreRepas: number;

  @Prop({ type: [String], default: [] })
  allergenes: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CantineSchema = SchemaFactory.createForClass(Cantine);
CantineSchema.index({ school: 1, date: 1 });
