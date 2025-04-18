import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
    readonly email: string;

    @ApiProperty({ example: 'pass1234', description: 'Password' })
    readonly password: string;
}
