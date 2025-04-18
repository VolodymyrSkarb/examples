import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { ProjectsService } from '../projects/projects.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { Project } from '../projects/projects.model';
import { UpdateUserDto, UploadImageDto } from './dto/update-user.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { TaskItemService } from '../projects/tasks-board/task-item/task-item.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        private projectService: ProjectsService,
        private taskItemService: TaskItemService,
        private fileService: FilesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        // const role = await this.roleService.getRoleByValue('USER');
        // await user.$set('roles', [role.id]);
        // user.roles = [role];
        // const project = await this.projectService.getProjectByName('VC');
        // await user.$set('projects', [project.id]);
        // user.projects = [project];
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: [
                {
                    all: true,
                    model: Project,
                    include: [{ all: true }],
                },
            ],
        });
        // const user = await this.userRepository.findOne({ where: { email }, include: [
        //         {
        //             model: User,
        //             where: [{ password: true },],
        //         },
        //     ],
        // });

        return user;
    }

    async getUserById(id: number) {
        // const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
        const user = await this.userRepository.findOne({
            where: { id },
            include: [
                {
                    all: true,
                    model: Project,
                    include: [{ all: true }],
                },
            ],
        });

        return user;
    }

    async getUserByActivateLink(activationLink: string) {
        const user = await this.userRepository.findOne({
            where: {
                activationLink,
            },
            include: {
                all: true,
            },
        });

        return user;
    }

    async assignRole(dto: AssignRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (user && role) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async assignProject(dto: AssignProjectDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const project = await this.projectService.getProjectById(dto.projectId);

        if (user && project) {
            await user.$add('project', project.id);
            return dto;
        }

        throw new HttpException(
            'User or project not found',
            HttpStatus.NOT_FOUND,
        );
    }

    async assignTask(dto: AssignTaskDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const taskItem = await this.taskItemService.getTaskItemById(
            dto.taskItemId,
        );

        if (user && taskItem) {
            await taskItem.$set('users', []); // Temporary solution to select only one user
            await user.$add('tasks', taskItem.id);

            return;
        }

        throw new HttpException(
            'User or project not found',
            HttpStatus.NOT_FOUND,
        );
    }

    async updateUser(dto: UpdateUserDto) {
        await this.userRepository.update(dto, {
            where: { id: dto.id },
        });

        // return this.userRepository.findByPk(dto.id);
        return this.getUserById(dto.id);
    }

    async uploadFile(userId: UploadImageDto, image: File) {
        const fileName = await this.fileService.createFile(image, userId);
        await this.userRepository.update(
            { image: fileName },
            {
                where: { id: userId.id },
            },
        );

        return this.getUserById(userId.id);
    }
}
