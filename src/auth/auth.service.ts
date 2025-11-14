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
    const user = await this.userService.findRawByEmailWithPassword(email);
    if (!user) return null;

    // Ensure password is present and compare
    const hash = (user as any).password;
    const ok = hash ? await bcrypt.compare(password, hash) : false;
    if (!ok) {
      // Minimal log without leaking sensitive info
      console.warn('Login failed: password mismatch for', email.toLowerCase());
      return null;
    }

    // Never return password
    const { password: _pw, ...result } = user.toObject();
    return result;
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
      const user = await this.userService.findRawById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // 3. Convertir en objet plain si c'est un document Mongoose
      const userObj = (user as any).toObject ? (user as any).toObject() : user;

      // 4. Générer de nouveaux tokens (rotation des refresh tokens)
      return this.generateTokens(userObj);
    } catch (error) {
      // Log minimal pour debug sans exposer les détails internes
      const msg = error instanceof UnauthorizedException ? error.message : 'Invalid or expired refresh token';
      console.error('Refresh token error:', msg);

      // Toujours renvoyer une Unauthorized pour le client
      throw new UnauthorizedException(msg);
    }
  }
}
