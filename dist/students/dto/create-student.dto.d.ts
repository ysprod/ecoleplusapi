import { Gender, BloodGroup } from '../schemas/student.schema';
export declare class CreateStudentDto {
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthPlace?: string;
    email?: string;
    gender: Gender;
    bloodGroup?: BloodGroup;
    parentContact?: string;
    class?: string;
    classLevel?: string;
    photoUrl?: string;
    healthNotes?: string;
    healthIssues?: string;
    forbiddenFoods?: string;
    matricule?: string;
}
