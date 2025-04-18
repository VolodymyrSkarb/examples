import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ example: 'TRET', description: 'Name of project' })
    readonly name: string;

    @ApiProperty({ example: 'The Real Estate Tours', description: 'Description of project' })
    readonly description: string;

    @ApiProperty({ example: '111', description: 'ID of User' })
    readonly createdUserId: string;
}
