import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConductLevel } from '../schemas/conduct.schema';

export class ConductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Student ID' })
  student: string;

  @ApiProperty({ description: 'Class ID' })
  class: string;

  @ApiProperty({ description: 'Term ID' })
  term: string;

  @ApiProperty({ description: 'AcademicYear ID' })
  academicYear: string;

  @ApiProperty({ enum: ConductLevel })
  discipline: ConductLevel;

  @ApiProperty({ enum: ConductLevel })
  behavior: ConductLevel;

  @ApiProperty({ enum: ConductLevel })
  participation: ConductLevel;

  @ApiProperty({ enum: ConductLevel })
  workHabits: ConductLevel;

  @ApiProperty()
  absences: number;

  @ApiProperty()
  justifiedAbsences: number;

  @ApiProperty()
  lates: number;

  @ApiProperty()
  sanctions: number;

  @ApiProperty()
  attendanceRate: number;

  @ApiPropertyOptional()
  generalRemarks?: string;

  @ApiPropertyOptional({
    type: [Object],
    description:
      'Liste des sanctions appliquées avec date, type, raison, et enseignant',
  })
  sanctionsList?: Array<{
    date: Date;
    type: string;
    reason: string;
    teacher: string;
  }>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
