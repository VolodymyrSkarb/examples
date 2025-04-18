import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { Project } from '../projects/projects.model';
import { UserProjects } from '../projects/user-projects.model';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { JwtRefreshToken } from '../auth/jwt-token.model';
import { TaskItem } from '../projects/tasks-board/task-item/task-item.model';
import { UserTasks } from '../projects/tasks-board/task-item/user-tasks.model';
import { TaskItemModule } from "../projects/tasks-board/task-item/task-item.module";
import { FilesModule } from "../files/files.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([
            User,
            Role,
            UserRoles,
            UserTasks,
            Project,
            UserProjects,
            JwtRefreshToken,
            TaskItem,
        ]),
        RolesModule,
        ProjectsModule,
        TaskItemModule,
        FilesModule,
        forwardRef(() => AuthModule),
        // forwardRef(() => TaskItem),
        // forwardRef(() => ProjectsModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
