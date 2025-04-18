import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/projects.model';
import { UserProjects } from './projects/user-projects.model';
import { TasksBoard } from './projects/tasks-board/tasks-board.model';
import { TasksBoardModule } from './projects/tasks-board/tasks-board.module';
import { TaskItemModule } from './projects/tasks-board/task-item/task-item.module';
import { TaskItem } from './projects/tasks-board/task-item/task-item.model';
import { JwtRefreshToken } from './auth/jwt-token.model';
import { MailModule } from './mail/mail.module';
import { UserTasks } from './projects/tasks-board/task-item/user-tasks.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                Role,
                UserRoles,
                Project,
                UserProjects,
                UserTasks,
                TasksBoard,
                TaskItem,
                JwtRefreshToken,
            ],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProjectsModule,
        TasksBoardModule,
        TaskItemModule,
        MailModule,
        FilesModule,
    ],
})
export class AppModule {}
