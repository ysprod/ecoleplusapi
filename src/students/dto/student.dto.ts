import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClassDto } from '../../classes/dto/class.dto';

export class StudentDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  birthDate?: string;

  @ApiPropertyOptional()
  birthPlace?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional({ enum: ['M', 'F'] })
  gender?: 'M' | 'F';

  @ApiPropertyOptional({ enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] })
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  @ApiPropertyOptional()
  parentContact?: string;

  @ApiPropertyOptional()
  parentEmail?: string;

  @ApiPropertyOptional({ type: () => ClassDto })
  class?: ClassDto;

  @ApiPropertyOptional()
  classLevel?: string;

  @ApiPropertyOptional()
  photoUrl?: string;

  @ApiPropertyOptional()
  healthNotes?: string;

  @ApiPropertyOptional()
  healthIssues?: string;

  @ApiPropertyOptional()
  forbiddenFoods?: string;

  @ApiPropertyOptional({ type: [String] })
  parents?: string[];

  @ApiPropertyOptional({ type: [String] })
  grades?: string[];

  @ApiPropertyOptional({ type: [String] })
  payments?: string[];

  @ApiPropertyOptional()
  matricule?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  age?: number;

  @ApiPropertyOptional()
  school?: string;

  @ApiPropertyOptional()
  schoolName?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  tuitionPaid?: boolean;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  parentName?: string;

  @ApiPropertyOptional()
  parentPhone?: string;

  @ApiPropertyOptional()
  classId?: string;

  @ApiPropertyOptional()
  upcomingEvents?: string;

  @ApiPropertyOptional()
  schoolId?: string;
}