import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponseDto } from './teacher-response.dto';

export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;
}

export class PaginatedTeachersResponseDto {
  @ApiProperty()
  pagination: PaginationMetaDto;

  @ApiProperty({ type: [TeacherResponseDto] })
  teachers: TeacherResponseDto[];
}