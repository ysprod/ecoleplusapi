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
       
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      
      if (!user) {
        console.warn('❌ Invalid credentials for:', loginDto.email);
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokens = this.authService.generateTokens(user);
      
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

  @Post('admin/seed-founder')
  @ApiOperation({ summary: 'Admin - Créer ou réinitialiser le compte fondateur' })
  @ApiResponse({ status: 200, description: 'Compte fondateur créé/réinitialisé' })
  @ApiResponse({ status: 401, description: 'Token admin invalide' })
  async adminSeedFounder(
    @Body()
    body: { 
      email?: string; 
      password?: string;
      firstName?: string;
      lastName?: string;
      token?: string 
    },
    @Headers('x-admin-token') headerToken?: string,
  ) {
    const adminToken = body?.token || headerToken;
    if (!adminToken || adminToken !== process.env.ADMIN_RESET_TOKEN) {
      throw new UnauthorizedException('Invalid admin token');
    }

    const email = (body?.email || 'fondateur@ecoleplus.ci').toLowerCase().trim();
    const password = body?.password || 'Fondateur2024!';
    const firstName = body?.firstName || 'FONDATEUR';
    const lastName = body?.lastName || 'ECOLEPLUS';

    if (password.length < 8) {
      throw new BadRequestException('Le mot de passe doit contenir au moins 8 caractères');
    }

    // Vérifier si l'utilisateur existe déjà (avec le mot de passe pour pouvoir le modifier)
    let user = await this.userService.findRawByEmailWithPassword(email);
    
    if (user) {
      // Réinitialiser le mot de passe
      const newHash = await bcrypt.hash(password, 10);
      (user as any).password = newHash;
      (user as any).firstName = firstName;
      (user as any).lastName = lastName;
      (user as any).role = 'admin';
      (user as any).profileType = 'founder';
      await (user as any).save();
      
      return { 
        ok: true, 
        action: 'updated',
        email,
        message: 'Compte fondateur réinitialisé avec succès'
      };
    } else {
      // Créer un nouveau compte
      const newUser = await this.userService.create({
        email,
        password,
        firstName,
        lastName,
        role: 'admin',
        profileType: 'founder',
      });
      
      return { 
        ok: true, 
        action: 'created',
        email,
        userId: newUser.id,
        message: 'Compte fondateur créé avec succès'
      };
    }
  }

  @Post('debug/check-user')
  @ApiOperation({ summary: 'Debug - Vérifier si un utilisateur existe' })
  async debugCheckUser(@Body() body: { email: string }) {
    const normalizedEmail = (body?.email || '').toLowerCase().trim();
    try {
      // Utiliser findRawByEmailWithPassword pour inclure le champ password
      const user = await this.userService.findRawByEmailWithPassword(normalizedEmail);
      if (!user) {
        const sample = await this.userService.listUserEmails(20);
        return { 
          found: false, 
          email: normalizedEmail,
          message: 'User not found in database',
          sampleTotal: sample.total,
          sampleUsers: sample.users,
          dbName: process.env.MONGODB_DB || 'default',
        };
      }
      const hasPassword = !!(user as any).password;
      const passwordLength = hasPassword ? (user as any).password?.length : 0;
      const isBcrypt = hasPassword && /^\$2[aby]?\$\d{2}\$/.test((user as any).password);
      
      return {
        found: true,
        email: user.email,
        normalizedMatch: user.email === normalizedEmail,
        role: user.role,
        hasPassword,
        passwordLength,
        isBcryptHash: isBcrypt,
        userId: (user as any)._id?.toString(),
        dbName: process.env.MONGODB_DB || 'default',
      };
    } catch (error) {
      return {
        found: false,
        email: normalizedEmail,
        error: error.message,
        dbName: process.env.MONGODB_DB || 'default',
      };
    }
  }
}
