import { GradeType } from '../schemas/grade.schema';
export declare class CreateGradeDto {
    student: string;
    teacher: string;
    value: number;
    type: GradeType;
    trimester: number;
    comments?: string;
    subject?: string;
    class?: string;
}
