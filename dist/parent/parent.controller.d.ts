import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { ParentToStudentDto } from './dto/parent-to-student.dto';
import { ParentService } from './parent.service';
import { UserDto } from 'src/user/dto/user.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentService);
    create(createParentDto: any): Promise<ParentResponseDto>;
    getMyProfile(req: any): Promise<ParentResponseDto>;
    getMyChildren(req: any): Promise<StudentResponseDto[]>;
    findById(id: string): Promise<ParentResponseDto>;
    getChildren(id: string): Promise<StudentResponseDto[]>;
    addChild(id: string, parentToStudentDto: ParentToStudentDto): Promise<ParentResponseDto>;
    removeChild(id: string, studentId: string): Promise<ParentResponseDto>;
    addChildToMe(req: any, parentToStudentDto: ParentToStudentDto): Promise<ParentResponseDto>;
    removeChildFromMe(req: any, studentId: string): Promise<ParentResponseDto>;
    getUserInfo(parentId: string, fields?: string): Promise<UserDto | null>;
}
