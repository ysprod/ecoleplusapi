import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    validateJwtPayload(payload: any): Promise<import("../user/dto/user-response.dto").UserResponseDto>;
    generateJwt(user: any): string;
    findOrCreateGoogleUser(googleUser: {
        email: string;
        name: string;
    }): Promise<import("../user/dto/user-response.dto").UserResponseDto>;
}
