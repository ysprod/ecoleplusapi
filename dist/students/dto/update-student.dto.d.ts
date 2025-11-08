import { CreateStudentDto } from '../../students/dto/create-student.dto';
declare const UpdateStudentDto_base: import("@nestjs/common").Type<Partial<CreateStudentDto>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    id: string;
}
export {};
