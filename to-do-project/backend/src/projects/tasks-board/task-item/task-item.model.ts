import {
    BelongsTo, BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TasksBoard } from '../tasks-board.model';
import { User } from '../../../users/users.model';
import { UserTasks } from './user-tasks.model';

interface TasksItemCreationAttrs {
    name: string;
    description: string;
    tasksBoardId: string;
    creatorUserId: number;
    updatedUserId: number;
}

@Table({ tableName: 'task_item' })
export class TaskItem extends Model<TaskItem, TasksItemCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true,
        // autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @ApiProperty({ example: 'Fix Bug', description: 'Name of Task' })
    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: 'Need to fix bug with map',
        description: 'Description of Bug',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @ApiProperty({ example: '1', description: 'unique id position' })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        // primaryKey: true,
    })
    positionId: number;

    @ForeignKey(() => TasksBoard)
    @Column({ type: DataType.UUID })
    tasksBoardId: string;

    @BelongsTo(() => TasksBoard)
    tasksBoard: TasksBoard;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    creatorUserId: number;

    @BelongsTo(() => User, { foreignKey: 'creatorUserId', as: 'creatorUser' })
    creatorUser: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    updatedUserId: number;

    @BelongsTo(() => User, { foreignKey: 'updatedUserId', as: 'updatedUser' })
    updatedUser: User;

    @BelongsToMany(() => User, () => UserTasks)
    users: User[];
}
