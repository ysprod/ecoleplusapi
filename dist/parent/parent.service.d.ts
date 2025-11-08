import { Model } from 'mongoose';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { ParentResponseDto } from './dto/parent-response.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentDocument } from './schemas/parent.schema';
import { StudentsService } from 'src/students/students.service';
export declare class ParentService {
    private parentModel;
    private userService;
    private studentService;
    constructor(parentModel: Model<ParentDocument>, userService: UserService, studentService: StudentsService);
    private mapToResponseDto;
    create(createParentDto: CreateParentDto): Promise<ParentResponseDto>;
    findByUserId(userId: string): Promise<ParentResponseDto>;
    getOrCreateParent(userId: string): Promise<ParentResponseDto>;
    getChildren(parentId: string): Promise<StudentResponseDto[]>;
    addStudentToParent(parentId: string, studentId: string): Promise<ParentResponseDto>;
    removeStudentFromParent(parentId: string, studentId: string): Promise<ParentResponseDto>;
    findById(id: string): Promise<ParentResponseDto>;
    update(id: string, updateParentDto: UpdateParentDto): Promise<ParentResponseDto>;
    remove(id: string): Promise<void>;
    getUserInfo(parentId: string, fields?: string[]): Promise<UserDto | null>;
}
