import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshToken } from './jwt-token.model';
import { MailService } from '../mail/mail.service';
import { AuthorizationUserDto } from '../users/dto/authorization-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {}

    async login(userDto: AuthorizationUserDto) {
        const user = await this.validateUser(userDto);
        const tokens = this.generateTokens(user);
        await this.saveToken(user.id, tokens.refreshToken);
        const activeUser = await this.validateUser(userDto);

        return {
            ...tokens,
            activeUser,
        };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException(
                'User with this email exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const activationLink = uuidv4();
        const user = await this.usersService.createUser({
            ...userDto,
            password: hashPassword,
            activationLink,
        });

        await this.mailService.sendActivationMail(
            userDto.email,
            `${process.env.API_URL}/auth/activate/${activationLink}`,
        );

        const tokens = this.generateTokens(user);
        await this.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }

    async logout(refreshToken: string) {
        const tokenData = await JwtRefreshToken.destroy({
            where: { refreshToken },
        });

        return tokenData;
    }

    async activateUser(link: string) {
        const user = await this.usersService.getUserByActivateLink(link);
        if (!user) {
            throw new HttpException(
                'Incorrect activation link',
                HttpStatus.BAD_REQUEST,
            );
        }

        user.isActivated = true;
        await user.save();
        // return link;
    }

    private generateTokens(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    validateToken(token) {
        try {
            const userData = this.jwtService.verify(token);

            return userData;
        } catch (e) {
            return null;
        }
    }

    private async saveToken(userId, refreshToken) {
        const tokenData = await JwtRefreshToken.findOne({ where: { userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await JwtRefreshToken.create({
            userId,
            refreshToken,
        });

        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException({ message: 'Wrong refresh token' });
        }

        const userData = this.validateToken(refreshToken);
        const tokenData = await JwtRefreshToken.findOne({ where: { refreshToken } });

        console.log(refreshToken, 'refreshToken');
        console.log(tokenData, 'tokenData');

        if (!userData || !tokenData) {
            throw new UnauthorizedException({ message: 'Please authorization' });
        }

        const user = await this.usersService.getUserById(userData.id);
        const tokens = this.generateTokens(user);
        await this.saveToken(user.id, tokens.refreshToken);
        const updateUserWithToken = await this.usersService.getUserById(userData.id);

        return {
            ...tokens,
            updateUserWithToken,
        };
    }

    private async validateUser(userDto: AuthorizationUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Wrong password or email' });
        }

        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Wrong password or email' });
    }
}
