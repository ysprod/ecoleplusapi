import { Model } from 'mongoose';
import { StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { ClassService } from '../class/class.service';
import { PaginatedStudentsResponseDto } from './dto/paginated-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private studentModel;
    private classService;
    constructor(studentModel: Model<StudentDocument>, classService: ClassService);
    private mapToResponseDto;
    create(createStudentDto: CreateStudentDto): Promise<StudentResponseDto>;
    findAll(query?: any, skip?: number, limit?: number): Promise<StudentResponseDto[]>;
    findById(id: string): Promise<StudentResponseDto>;
    findByMatricule(matricule: string): Promise<StudentResponseDto>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentResponseDto>;
    remove(id: string): Promise<void>;
    searchStudents(searchTerm: string): Promise<StudentResponseDto[]>;
    getPaginatedStudents(classId?: string, page?: number, limit?: number): Promise<PaginatedStudentsResponseDto>;
    addParent(studentId: string, parentId: string): Promise<StudentResponseDto>;
    count(query?: any): Promise<number>;
}
