import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Value of role' })
    readonly name: string;

    @ApiProperty({ example: 'Administrator', description: 'Description of role' })
    readonly description: string;
}
