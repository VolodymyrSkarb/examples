import { ApiProperty } from '@nestjs/swagger';

export class UpdateTasksBoardDto {
    @ApiProperty({ example: '1', description: 'Id of Tasks List' })
    readonly id: string;

    @ApiProperty({ example: 'To Do', description: 'Name of Tasks List' })
    readonly name: string;
}
