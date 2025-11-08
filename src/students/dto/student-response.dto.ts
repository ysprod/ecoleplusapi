// src/student/dto/student-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Gender, BloodGroup } from '../schemas/student.schema';
import { ClassResponseDto } from '../../class/dto/class-response.dto';
import { ParentResponseDto } from '../../parent/dto/parent-response.dto';
import { GradeResponseDto } from '../../grade/dto/grade-response.dto';
import { PaymentResponseDto } from '../../payment/dto/payment-response.dto';

export class StudentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  age: number;

  @ApiProperty()
  birthPlace?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty({ enum: BloodGroup })
  bloodGroup?: BloodGroup;

  @ApiProperty()
  parentContact?: string;

  @ApiProperty()
  class?: ClassResponseDto;

  @ApiProperty()
  classLevel?: string;

  @ApiProperty()
  photoUrl?: string;

  @ApiProperty()
  healthNotes?: string;

  @ApiProperty()
  healthIssues?: string;

  @ApiProperty()
  forbiddenFoods?: string;

  @ApiProperty({ type: [ParentResponseDto] })
  parents: ParentResponseDto[];

  @ApiProperty({ type: [GradeResponseDto] })
  grades: GradeResponseDto[];

  @ApiProperty({ type: [PaymentResponseDto] })
  payments: PaymentResponseDto[];

  @ApiProperty()
  matricule: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}