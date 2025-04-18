import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtRefreshToken } from './jwt-token.model';
import { User } from '../users/users.model';
import { MailModule } from '../mail/mail.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        SequelizeModule.forFeature([JwtRefreshToken, User]),
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: { expiresIn: '24h' },
        }),
        MailModule,
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
