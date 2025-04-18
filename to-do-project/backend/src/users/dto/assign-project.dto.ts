import { ApiProperty } from '@nestjs/swagger';

export class AssignProjectDto {
    @ApiProperty({ example: '1', description: 'ID of Project' })
    readonly projectId: number;

    @ApiProperty({ example: '1', description: 'User ID' })
    readonly userId: string;
}
