import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
    readonly email: string;

    @ApiProperty({ example: 'pass1234', description: 'Password' })
    readonly password: string;

    @ApiProperty({ example: 'v34fa-asfasf-142saf-sa-asf', description: 'Activation link' })
    readonly activationLink: string;
}
