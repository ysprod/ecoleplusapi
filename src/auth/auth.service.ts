import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUserbcrypt(email: string, password: string) {
  //   const user = await this.userService.findByEmail(email);
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findRawByEmail(email);
    // if (user && await bcrypt.compare(password, user.password)) {
    if (user) {
      // Ne jamais retourner le mot de passe !
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async validateJwtPayload(payload: any) {
    return this.userService.findOne(payload.sub);
  }

  generateJwt(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async findOrCreateGoogleUser(googleUser: { email: string; name: string }) {
    const email = (googleUser.email || '').toLowerCase();
    const fullName = (googleUser.name || '').trim();
    const [firstNameRaw, ...rest] = fullName.split(' ');
    const firstName = firstNameRaw || email.split('@')[0];
    const lastName = rest.join(' ');

    try {
      return await this.userService.findByEmail(email);
    } catch {
      const password = `oauth-google-${Math.random().toString(36).slice(2, 10)}`; // >= 8 chars
      return this.userService.create({
        email,
        firstName,
        lastName,
        password,
        role: 'user',
        profileType: 'other',
      });
    }
  }

  /**
   * Génère un access token et un refresh token
   */
  generateTokens(user: any) {
    const userId =
      user._id?.toString() || user.id?.toString() || user._id || user.id;
    const payload = {
      sub: userId,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  /**
   * Vérifie et décode un refresh token, puis génère de nouveaux tokens
   */
  async refreshTokens(refreshToken: string) {
    try {
      // 1. Vérifier la signature et l'expiration du refresh token
      const payload = this.jwtService.verify(refreshToken);

      // 2. Retrouver l'utilisateur depuis le payload
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // 3. Convertir en objet plain si c'est un document Mongoose
      const userObj = (user as any).toObject ? (user as any).toObject() : user;

      // 4. Générer de nouveaux tokens (rotation des refresh tokens)
      return this.generateTokens(userObj);
    } catch (error) {
      // Log l'erreur pour debug (sera visible dans les logs Render)
      console.error('Refresh token error:', error.message);

      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
