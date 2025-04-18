import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { TaskItem } from './tasks-board/task-item/task-item.model';
import { TasksBoard } from './tasks-board/tasks-board.model';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project)
        private projectRepository: typeof Project,

        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
    ) {}

    async createProject(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto);
        await this.usersService.assignProject({
            userId: dto.createdUserId,
            projectId: project.id,
        });
        // const role = await this.roleService.getRoleByValue('USER');
        // await user.$set('roles', [role.id]);
        // user.roles = [role];
        return project;
    }

    async deleteProjectById(id: string) {
        return await this.projectRepository.destroy({ where: { id } });
    }

    async getAllUserProjects(userId: number) {
        // return await this.projectRepository.findAll({ include: { all: true } });
        // await this.projectRepository.hasMany(User, { foreignKey: 'id' });
        return await this.projectRepository.findAll({
            include: [
                {
                    model: User,
                    where: { id: userId },
                    // all: true,
                },
                {
                    model: TasksBoard,
                    include: [
                        {
                            model: TaskItem,
                            separate: true,
                        },
                    ],
                },
            ],
            order: [['id', 'ASC']],
        });
    }

    async getProjectById(id: number) {
        const project = await this.projectRepository.findOne({
            where: { id },
            include: [
                {
                    model: TasksBoard,
                    include: [
                        {
                            model: TaskItem,
                            separate: true,
                            order: [['positionId', 'ASC']],
                            include: [
                                {
                                    all: true,
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [[{ model: TasksBoard, as: 'tasksBoard' }, 'positionId', 'ASC']],
        });

        return project;
    }
}
