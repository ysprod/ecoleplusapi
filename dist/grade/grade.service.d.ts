import { Model } from 'mongoose';
import { GradeDocument } from './schemas/grade.schema';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradeResponseDto } from './dto/grade-response.dto';
import { TeacherService } from '../teacher/teacher.service';
import { StudentsService } from 'src/students/students.service';
export declare class GradeService {
    private gradeModel;
    private studentService;
    private teacherService;
    constructor(gradeModel: Model<GradeDocument>, studentService: StudentsService, teacherService: TeacherService);
    private mapToResponseDto;
    create(createGradeDto: CreateGradeDto): Promise<GradeResponseDto>;
    findByStudentId(studentId: string): Promise<GradeResponseDto[]>;
    deleteByStudentId(studentId: string): Promise<void>;
}
