import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of Role' })
    readonly value: string;

    @ApiProperty({ example: '1', description: 'User ID' })
    readonly userId: number;
}
