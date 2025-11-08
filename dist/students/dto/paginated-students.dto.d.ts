import { StudentResponseDto } from './student-response.dto';
export declare class PaginationMetaDto {
    page: number;
    limit: number;
    total: number;
    pages: number;
}
export declare class PaginatedStudentsResponseDto {
    pagination: PaginationMetaDto;
    students: StudentResponseDto[];
}
