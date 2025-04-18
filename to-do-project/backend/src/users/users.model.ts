import {
    BelongsToMany,
    Column,
    DataType, HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Project } from '../projects/projects.model';
import { UserProjects } from '../projects/user-projects.model';
import { JwtRefreshToken } from '../auth/jwt-token.model';
import { TaskItem } from '../projects/tasks-board/task-item/task-item.model';
import { UserTasks } from '../projects/tasks-board/task-item/user-tasks.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({ example: 'pass1234', description: 'Password' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({ example: 'true', description: 'Email Confirmation' })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isActivated: boolean;

    @ApiProperty({ example: 'true', description: 'Email Confirmation' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    activationLink: string;

    @ApiProperty({ example: 'Volodymyr', description: 'User First Name' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    firstName: string;

    @ApiProperty({ example: 'Karbivnychyi', description: 'User Last Name' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    lastName: string;

    @ApiProperty({ example: 'Frontend Developer', description: 'User Position' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    position: string;

    @ApiProperty({ example: 'avatar.img', description: 'User Avatar' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @BelongsToMany(() => Project, () => UserProjects)
    projects: Project[];

    @BelongsToMany(() => TaskItem, () => UserTasks)
    tasks: TaskItem[];

    @HasMany(() => JwtRefreshToken)
    jwtRefreshToken: JwtRefreshToken;

    @HasMany(() => TaskItem, 'creatorUserId')
    createdTaskItems: TaskItem[];

    @HasMany(() => TaskItem, 'updatedUserId')
    updatedTaskItems: TaskItem[];
}
