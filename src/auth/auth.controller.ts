import {
  Controller,
  Post,
  Body,
  Res,
  Headers,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() loginDto: LoginDto) {
    try {
      console.log('🔐 Login attempt:', { email: loginDto.email });
      
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      
      if (!user) {
        console.warn('❌ Invalid credentials for:', loginDto.email);
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokens = this.authService.generateTokens(user);
      console.log('✅ Login successful:', loginDto.email);
      
      return { ...tokens, user };
    } catch (error) {
      console.error('❌ Login error:', error?.message || error);
      throw error;
    }
  }

  @Post('google')
  @ApiOperation({ summary: 'Authentification Google OAuth' })
  @ApiResponse({ status: 200, description: 'Authentification réussie' })
  async googleAuth(@Body() googleUser: { email: string; name: string }) {
    const user = await this.authService.findOrCreateGoogleUser(googleUser);
    const tokens = this.authService.generateTokens(user);
    return { ...tokens, user };
  }

  @Post('refresh')
  @ApiOperation({ summary: "Rafraîchir le token d'accès" })
  @ApiResponse({ status: 200, description: 'Tokens rafraîchis avec succès' })
  @ApiResponse({ status: 401, description: 'Refresh token invalide ou expiré' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Post('admin/reset-password')
  @ApiOperation({ summary: 'Admin - Réinitialiser le mot de passe utilisateur' })
  @ApiResponse({ status: 200, description: 'Mot de passe réinitialisé' })
  @ApiResponse({ status: 401, description: 'Token admin invalide' })
  async adminResetPassword(
    @Body()
    body: { email: string; newPassword: string; token?: string },
    @Headers('x-admin-token') headerToken?: string,
  ) {
    const adminToken = body?.token || headerToken;
    if (!adminToken || adminToken !== process.env.ADMIN_RESET_TOKEN) {
      throw new UnauthorizedException('Invalid admin token');
    }
    const email = (body?.email || '').toLowerCase().trim();
    const newPassword = body?.newPassword || '';
    if (!email || newPassword.length < 8) {
      throw new BadRequestException('Email et nouveau mot de passe (>= 8) requis');
    }

    const user = await this.userService.findRawByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newHash = await bcrypt.hash(newPassword, 10);
    (user as any).password = newHash;
    await (user as any).save();
    return { ok: true, email };
  }
}
