import { ApiProperty } from '@nestjs/swagger';

export class TeacherAssignmentRequestDto {
  @ApiProperty()
  teacherId: string;

  @ApiProperty()
  classId: string;

  @ApiProperty()
  schoolId: string;

  @ApiProperty({ type: [String] })
  subjects: string[];

  @ApiProperty()
  matricule: string;
}