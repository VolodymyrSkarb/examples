import { ApiProperty } from '@nestjs/swagger';

export class AssignTaskDto {
    @ApiProperty({ example: '1', description: 'ID of Task' })
    readonly taskItemId: string;

    @ApiProperty({ example: '1', description: 'User ID' })
    readonly userId: number;
}
