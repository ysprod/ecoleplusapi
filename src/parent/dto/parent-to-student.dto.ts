import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParentToStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studentId: string;
}
