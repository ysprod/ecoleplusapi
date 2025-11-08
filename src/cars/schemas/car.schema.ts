import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Car extends Document {
  @Prop({
    type: String,
    required: [true, 'La matricule est obligatoire'],
    unique: true,
    trim: true,
    uppercase: true,
  })
  matricule: string;

  @Prop({
    type: String,
    required: [true, 'Le modèle est obligatoire'],
    trim: true
  })
  carmodel: string;

  @Prop({
    type: Number,
    required: [true, 'L\'année est obligatoire'],
    min: [1900, 'L\'année doit être supérieure à 1900'],
    max: [new Date().getFullYear() + 1, 'L\'année ne peut pas être dans le futur']
  })
  year: number;

  @Prop({
    type: Number,
    required: [true, 'La capacité est obligatoire'],
    min: [1, 'La capacité doit être au moins 1'],
    max: [100, 'La capacité ne peut pas dépasser 100 personnes']
  })
  capacity: number;

  @Prop({
    type: String,
    required: [true, 'Le nom du chauffeur est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom du chauffeur doit contenir au moins 2 caractères']
  })
  driverName: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);

// Indexes
CarSchema.index({ isActive: 1 });
CarSchema.index({ carmodel: 1 });
CarSchema.index({ driverName: 1 });
CarSchema.index({ year: 1 });

// Virtuals
CarSchema.virtual('age').get(function () {
  return new Date().getFullYear() - this.year;
});

// Methods
CarSchema.methods.deactivate = function () {
  this.isActive = false;
  return this.save();
};

CarSchema.methods.activate = function () {
  this.isActive = true;
  return this.save();
};

// Statics
CarSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

CarSchema.statics.findByMinCapacity = function (minCapacity: number) {
  return this.find({ capacity: { $gte: minCapacity }, isActive: true });
};