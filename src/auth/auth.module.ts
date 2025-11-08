import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/user/strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [forwardRef(() => UserModule), PassportModule, JwtModule.register({
        global: true,
        signOptions: { expiresIn: '30d' },
        secret: process.env.JWT_SECRET || 'secretKey',
    }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService,JwtStrategy],
})
export class AuthModule { } 