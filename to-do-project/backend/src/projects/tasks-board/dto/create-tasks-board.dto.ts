import { ApiProperty } from '@nestjs/swagger';

export class CreateTasksBoardDto {
    @ApiProperty({ example: 'To Do', description: 'Name of Tasks List' })
    readonly name: string;

    @ApiProperty({ example: '1', description: 'ID of Project' })
    readonly projectId: number;
}
