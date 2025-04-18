import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskItemDto {
    @ApiProperty({ example: '1', description: 'ID of Task' })
    readonly id: string;

    @ApiProperty({ example: 'Fix Bug', description: 'Name of Task' })
    readonly name: string;

    @ApiProperty({
        example: 'Need to fix bug with map',
        description: 'Description of Bug',
    })
    readonly description: string;
}