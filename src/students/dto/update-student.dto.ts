// src/student/dto/update-student.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from '../../students/dto/create-student.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}