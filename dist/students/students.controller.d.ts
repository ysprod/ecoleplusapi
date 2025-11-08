import { Model } from 'mongoose';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginatedStudentsResponseDto } from './dto/paginated-students.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { UserDocument } from '../user/schemas/user.schema';
export declare class StudentsController {
    private readonly studentsService;
    private userModel;
    constructor(studentsService: StudentsService, userModel: Model<UserDocument>);
    searchStudents(search: string): Promise<{
        data: StudentResponseDto[];
    }>;
    findAll(): Promise<StudentResponseDto[]>;
    create(createStudentDto: CreateStudentDto): Promise<StudentResponseDto>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentResponseDto>;
    remove(id: string): Promise<void>;
    getPaginated(classId: string, page?: number, limit?: number): Promise<PaginatedStudentsResponseDto>;
    verifyStudent(id: string): Promise<{
        data: StudentResponseDto | null;
    }>;
    findByMatricule(matricule: string): Promise<StudentResponseDto>;
    findById(id: string): Promise<StudentResponseDto>;
    addParent(studentId: string, parentId: string): Promise<StudentResponseDto>;
}
