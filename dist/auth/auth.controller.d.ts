import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: any;
    }>;
    googleAuth(googleUser: {
        email: string;
        name: string;
    }): Promise<{
        accessToken: string;
        user: import("../user/dto/user-response.dto").UserResponseDto;
    }>;
}
