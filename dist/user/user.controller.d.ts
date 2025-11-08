import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    login(loginDto: LoginDto, req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): any;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<UserResponseDto>;
    findByMatricule(matricule: string): Promise<UserResponseDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<void>;
    demoteToUser(id: string): Promise<UserResponseDto>;
}
