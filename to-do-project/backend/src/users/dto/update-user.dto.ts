import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: '1', description: 'User ID' })
    readonly id: number;

    @ApiProperty({ example: 'Volodymyr', description: 'User First Name' })
    readonly firstName: string;

    @ApiProperty({
        example: 'Karbivnychyi',
        description: 'User Last Name',
    })
    readonly lastName: string;

    @ApiProperty({
        example: 'Frontend Developer',
        description: 'User Position',
    })
    readonly position: string;

    @ApiProperty({
        example: 'avatar.img',
        description: 'User Avatar',
    })
    readonly image: string;
}

export class UploadImageDto {
    @ApiProperty({ example: '1', description: 'User ID' })
    readonly id: number;
}
