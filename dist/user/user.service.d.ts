import { Model, Types } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from 'src/teacher/schemas/teacher.schema';
export declare class UserService {
    private teacherModel;
    private userModel;
    private teacherService;
    constructor(teacherModel: Model<Teacher>, userModel: Model<UserDocument>, teacherService: TeacherService);
    private mapToResponseDto;
    findByPhone(phone: string): Promise<UserResponseDto>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<UserResponseDto>;
    findByMatricule(matricule: string): Promise<UserResponseDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<void>;
    demoteToUser(id: string): Promise<UserResponseDto>;
    findRawByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserResponseDto>;
    getUserById(userId: Types.ObjectId | string, fields?: string[]): Promise<UserDto | null>;
}
