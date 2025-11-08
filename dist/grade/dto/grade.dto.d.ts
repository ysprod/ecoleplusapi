export declare class GradeDto {
    _id?: string;
    student: string;
    teacher: string;
    subject: string;
    value: number;
    type: 'HOMEWORK' | 'QUIZ' | 'EXAM';
    trimester: number;
    comments?: string;
    createdAt?: string;
    updatedAt?: string;
    studentId?: string;
    teacherId?: string;
}
