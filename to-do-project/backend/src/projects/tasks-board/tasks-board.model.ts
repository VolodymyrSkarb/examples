import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../projects.model';
import { TaskItem } from './task-item/task-item.model';

interface TasksBoardCreationAttrs {
    name: string;
    projectId: number;
}

@Table({ tableName: 'tasks_board' })
export class TasksBoard extends Model<TasksBoard, TasksBoardCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
        // autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @ApiProperty({ example: 'To DO', description: 'Name of Tasks Board' })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @ApiProperty({ example: '1', description: 'unique id position' })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    positionId: number;

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER })
    projectId: number;

    @BelongsTo(() => Project)
    project: Project;

    @HasMany(() => TaskItem)
    taskItem: TaskItem[];
}
