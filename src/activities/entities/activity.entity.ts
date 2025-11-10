import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { School } from 'src/school/schemas/school.schema';
import { User } from 'src/user/schemas/user.schema';

export type ActivityCategory =
  | 'sport'
  | 'art'
  | 'musique'
  | 'science'
  | 'autre';
export type ActivityLevel = 'débutant' | 'intermédiaire' | 'avancé';
export type DayOfWeek =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi';

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'School', required: true })
  school: School;

  @Prop({
    type: String,
    required: [true, "Le nom de l'activité est obligatoire"],
    trim: true,
    uppercase: true,
  })
  name: string;

  @Prop({ type: String, trim: true })
  description: string;

  @Prop({
    type: String,
    enum: ['sport', 'art', 'musique', 'science', 'autre'],
    default: 'autre',
  })
  category: ActivityCategory;

  @Prop({
    type: String,
    enum: ['débutant', 'intermédiaire', 'avancé'],
    default: 'débutant',
  })
  level: ActivityLevel;

  @Prop({
    type: {
      day: {
        type: String,
        enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        required: true,
      },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    required: true,
  })
  schedule: {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
  };

  @Prop({ type: String, required: true, trim: true })
  location: string;

  @Prop({ type: Number })
  maxParticipants: number;

  @Prop({ type: Number, default: 0 })
  currentParticipants: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  animator: User;

  @Prop({ type: Number, min: 0, default: 0 })
  price: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
