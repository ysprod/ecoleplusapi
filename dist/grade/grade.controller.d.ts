import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradeResponseDto } from './dto/grade-response.dto';
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    create(createGradeDto: CreateGradeDto): Promise<GradeResponseDto>;
    findByStudentId(studentId: string): Promise<GradeResponseDto[]>;
    deleteByStudentId(studentId: string): Promise<void>;
}
