import { TeacherResponseDto } from './teacher-response.dto';
export declare class PaginationMetaDto {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export declare class PaginatedTeachersResponseDto {
    pagination: PaginationMetaDto;
    teachers: TeacherResponseDto[];
}
