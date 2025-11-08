import { ApiPropertyOptional } from '@nestjs/swagger';

export class SchoolDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiPropertyOptional()
  localite?: string;

  @ApiPropertyOptional()
  directeur?: string;

  @ApiPropertyOptional()
  dateCreation?: string;

  @ApiPropertyOptional({ enum: ['public', 'privé'] })
  statut: 'public' | 'privé';

  @ApiPropertyOptional({ type: [String] })
  niveaux?: string[];

  @ApiPropertyOptional()
  user?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  nom?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  academicYear?: string;

  @ApiPropertyOptional()
  educationLevel?: string;

  @ApiPropertyOptional()
  location?: string;

  // Si besoin, décommentez et importez les DTO correspondants
  // @ApiPropertyOptional({ type: [AcademicYearDto] })
  // academicYears?: AcademicYearDto[];

  // @ApiPropertyOptional({ type: [ClassDto] })
  // classes?: ClassDto[];

  // @ApiPropertyOptional({ type: [TeacherDto] })
  // teachers?: TeacherDto[];
}




