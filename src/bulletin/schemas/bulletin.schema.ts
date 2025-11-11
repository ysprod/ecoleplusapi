import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum BulletinStatus {
  DRAFT = 'DRAFT',
  GENERATED = 'GENERATED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum BulletinDecision {
  FELICITATIONS = 'FELICITATIONS',
  TABLEAU_HONNEUR = 'TABLEAU_HONNEUR',
  ENCOURAGEMENTS = 'ENCOURAGEMENTS',
  ADMIS = 'ADMIS',
  REDOUBLE = 'REDOUBLE',
  EXCLUS = 'EXCLUS',
}

@Schema({ timestamps: true })
export class Bulletin {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true })
  class: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Term', required: true, index: true })
  term: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop([
    {
      subject: { type: Types.ObjectId, ref: 'Subject', required: true },
      coefficient: { type: Number, required: true },
      interrogation: { type: Number, default: 0 },
      devoir: { type: Number, default: 0 },
      composition: { type: Number, default: 0 },
      moyenne: { type: Number, required: true },
      appreciation: { type: String },
      rank: { type: Number },
      teacher: { type: Types.ObjectId, ref: 'Teacher' },
      teacherName: { type: String },
    },
  ])
  grades: Array<{
    subject: Types.ObjectId;
    coefficient: number;
    interrogation: number;
    devoir: number;
    composition: number;
    moyenne: number;
    appreciation?: string;
    rank?: number;
    teacher?: Types.ObjectId;
    teacherName?: string;
  }>;

  @Prop({
    type: {
      generalAverage: { type: Number, required: true },
      classAverage: { type: Number, required: true },
      rank: { type: Number, required: true },
      totalStudents: { type: Number, required: true },
      highestAverage: { type: Number, required: true },
      lowestAverage: { type: Number, required: true },
      totalCoefficients: { type: Number, required: true },
    },
    required: true,
  })
  statistics: {
    generalAverage: number;
    classAverage: number;
    rank: number;
    totalStudents: number;
    highestAverage: number;
    lowestAverage: number;
    totalCoefficients: number;
  };

  @Prop({ type: Types.ObjectId, ref: 'Conduct' })
  conduct: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Remark' }])
  remarks: Types.ObjectId[];

  @Prop({ enum: BulletinDecision })
  decision?: BulletinDecision;

  @Prop({ enum: BulletinStatus, default: BulletinStatus.DRAFT })
  status: BulletinStatus;

  @Prop()
  generatedAt?: Date;

  @Prop()
  publishedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  generatedBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  publishedBy?: Types.ObjectId;

  @Prop()
  pdfUrl?: string;

  @Prop({ default: false })
  parentNotified: boolean;

  @Prop()
  parentNotifiedAt?: Date;

  @Prop({ default: false })
  downloaded: boolean;

  @Prop()
  downloadedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export type BulletinDocument = Bulletin & Document;
export const BulletinSchema = SchemaFactory.createForClass(Bulletin);

BulletinSchema.index({ student: 1, term: 1 }, { unique: true });
BulletinSchema.index({ class: 1, term: 1 });
BulletinSchema.index({ status: 1 });
BulletinSchema.index({ decision: 1 });
