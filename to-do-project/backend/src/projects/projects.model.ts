import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserProjects } from './user-projects.model';
import { TasksBoard } from './tasks-board/tasks-board.model';

interface ProjectCreationAttrs {
    name: string;
    description: string;
    // createdUserId: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'TRET', description: 'Name of project' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: 'The Real Estate Tours',
        description: 'Description of Project',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @BelongsToMany(() => User, () => UserProjects)
    users: User[];

    @HasMany(() => TasksBoard)
    tasksBoard: TasksBoard[];
}
