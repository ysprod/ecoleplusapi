// src/student/dto/paginated-students.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { StudentResponseDto } from './student-response.dto';
 
export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  pages: number;
}

export class PaginatedStudentsResponseDto {
  @ApiProperty()
  pagination: PaginationMetaDto;

  @ApiProperty({ type: [StudentResponseDto] })
  students: StudentResponseDto[];
}