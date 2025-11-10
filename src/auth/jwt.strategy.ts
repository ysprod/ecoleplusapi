// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret || 'your-secret-key',
    });
  }

  // async validate(payload: any) {
  //   return { _id: payload.sub, email: payload.email, role: payload.role };
  // }

  async validate(payload: any) {
    // Validate payload structure
    if (!payload.sub) {
      throw new UnauthorizedException('JWT payload missing sub');
    }

    // Fetch user from database to ensure they still exist
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      _id: user.id,
      email: user.email,
      role: user.role,
      // add other necessary user properties
    };
  }
}
