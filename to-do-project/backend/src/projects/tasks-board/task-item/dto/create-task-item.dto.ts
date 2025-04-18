import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskItemDto {
    @ApiProperty({ example: 'Fix Bug', description: 'Name of Task' })
    readonly name: string;

    @ApiProperty({
        example: 'Need to fix bug with map',
        description: 'Description of Bug',
    })
    readonly description: string;

    @ApiProperty({ example: '1', description: 'ID of Tasks Board' })
    readonly tasksBoardId: string;

    @ApiProperty({ example: '1', description: 'ID of User' })
    readonly creatorUserId: number;
}
