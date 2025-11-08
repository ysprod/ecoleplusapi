import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET') || 'dev-secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, email: payload.email, role: payload.role };
  // }

    async validate(payload: any) {
    // Ce que tu retournes ici devient request.user
    return { _id: payload.sub, email: payload.email, role: payload.role };
  }
}