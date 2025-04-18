import { forwardRef, Module } from '@nestjs/common';
import { TasksBoardController } from './tasks-board.controller';
import { TasksBoardService } from './tasks-board.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from '../projects.model';
import { TasksBoard } from './tasks-board.model';
import { TaskItem } from './task-item/task-item.model';
import { AuthModule } from '../../auth/auth.module';
import { TaskItemModule } from './task-item/task-item.module';

@Module({
    controllers: [TasksBoardController],
    providers: [TasksBoardService],
    imports: [
        SequelizeModule.forFeature([TasksBoard, Project, TaskItem]),
        AuthModule,
        forwardRef(() => TaskItemModule),
    ],
    exports: [TasksBoardService],
})
export class TasksBoardModule {}
