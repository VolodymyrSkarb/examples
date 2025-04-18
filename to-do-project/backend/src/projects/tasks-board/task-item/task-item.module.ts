import { forwardRef, Module } from '@nestjs/common';
import { TaskItemService } from './task-item.service';
import { TaskItemController } from './task-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksBoard } from '../tasks-board.model';
import { TaskItem } from './task-item.model';
import { AuthModule } from '../../../auth/auth.module';
import { TasksBoardModule } from '../tasks-board.module';
import { UsersModule } from '../../../users/users.module';
import { User } from '../../../users/users.model';
import { UserTasks } from './user-tasks.model';

@Module({
    providers: [TaskItemService],
    controllers: [TaskItemController],
    imports: [
        SequelizeModule.forFeature([TasksBoard, TaskItem, User, UserTasks]),
        AuthModule,
        forwardRef(() => TasksBoardModule),
        // forwardRef(() => UsersModule),
    ],
    exports: [TaskItemService],
})
export class TaskItemModule {}
