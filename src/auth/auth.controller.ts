import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.authService.generateJwt(user);
    return { accessToken, user };
  }

  @Post('google')
  async googleAuth(@Body() googleUser: { email: string; name: string }) {
    const user = await this.authService.findOrCreateGoogleUser(googleUser);
    const accessToken = this.authService.generateJwt(user);
    return { accessToken, user };
  }
}
