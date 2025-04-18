import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../../../users/users.model';
import { TaskItem } from './task-item.model';

@Table({ tableName: 'user_tasks', createdAt: false, updatedAt: false })
export class UserTasks extends Model<UserTasks> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => TaskItem)
    @Column({ type: DataType.UUID })
    taskItemId: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}
