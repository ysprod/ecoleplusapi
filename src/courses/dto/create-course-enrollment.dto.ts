import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class CreateCourseEnrollmentDto {
  @ApiProperty()
  @IsMongoId()
  course: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  studentIds: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  enrolledAt?: string;
}
