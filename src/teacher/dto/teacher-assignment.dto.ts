import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsArray } from 'class-validator';

export class TeacherAssignmentRequestDto {
  @ApiProperty()
  @IsMongoId()
  teacherId: string;

  @ApiProperty()
  @IsMongoId()
  classId: string;

  @ApiProperty()
  @IsMongoId()
  schoolId: string;

  @ApiProperty({ type: [String], required: false, description: 'Liste des IDs de matières à ajouter au professeur et à la classe' })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subjects?: string[];

  @ApiProperty({ description: 'Matricule enseignant (si teacherId inconnu)' })
  @IsString()
  matricule: string;
}
