import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Project } from './projects.model';

@Table({ tableName: 'user_projects', createdAt: false, updatedAt: false })
export class UserProjects extends Model<UserProjects> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Project)
    @Column({ type: DataType.UUID })
    projectId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}
