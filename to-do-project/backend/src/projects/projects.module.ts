import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Project } from './projects.model';
import { UserProjects } from './user-projects.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TasksBoard } from './tasks-board/tasks-board.model';
import { AuthModule } from '../auth/auth.module';
import { TaskItemModule } from './tasks-board/task-item/task-item.module';
import { TasksBoardModule } from './tasks-board/tasks-board.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        SequelizeModule.forFeature([Project, User, UserProjects, TasksBoard]),
        AuthModule,
        TaskItemModule,
        TasksBoardModule,
        forwardRef(() => UsersModule),
    ],
    exports: [ProjectsService],
})
export class ProjectsModule {}
