import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Req,
    Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(
        @Body() userDto: CreateUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userData = await this.authService.login(userDto);
        response.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return userData;
    }

    @Post('/registration')
    async registration(
        @Body() userDto: CreateUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userData = await this.authService.registration(userDto);
        response.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return userData;
    }

    @Post('/logout')
    async logout(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ) {
        const refreshToken = request.headers.cookie.split('=')[1];
        const token = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return token;
    }

    @Get('/refresh')
    async refreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.headers.cookie.split('=')[1];
        const userData = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return userData;
    }

    @Get('/activate/:link')
    @Redirect()
    activateUser(@Param('link') link: string) {
        this.authService.activateUser(link);

        return {
            url: process.env.CLIENT_URL,
        };
    }
}
