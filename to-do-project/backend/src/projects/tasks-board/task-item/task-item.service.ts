import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskItem } from './task-item.model';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';
import { TasksBoard } from '../tasks-board.model';
import { TasksBoardService } from '../tasks-board.service';
import { Project } from "../../projects.model";
import { User } from '../../../users/users.model';
import { UserTasks } from "./user-tasks.model";

@Injectable()
export class TaskItemService {
    constructor(
        @InjectModel(TaskItem) private taskItemRepository: typeof TaskItem,
        @InjectModel(TasksBoard) private tasksBoardRepository: typeof TasksBoard,
        private taskBoardService: TasksBoardService,
    ) {}

    async createTaskItem(dto: CreateTaskItemDto) {
        return await this.taskItemRepository.create(dto);
    }

    async updateTaskItem(dto: UpdateTaskItemDto) {
        await this.taskItemRepository.update(dto, {
            where: { id: dto.id },
        });

        // return await this.taskItemRepository.findByPk(dto.id);

        return await this.taskItemRepository.findByPk(dto.id, {
            include: [
                {
                    model: TasksBoard,
                    include: [
                        {
                            all: true,
                        },
                    ],
                },
                {
                    model: User,
                    as: 'creatorUser',
                    attributes: ['email', 'firstName', 'lastName'],
                },
                {
                    model: User,
                    as: 'updatedUser',
                    attributes: ['email', 'firstName', 'lastName'],
                },
            ],
        });
    }

    async updateOrder(updatedTasksBoard: TasksBoard) {
        // console.log(updatedTasksBoard);
        // console.log('start');

        let position = 1;
        // for (const item of updatedTasksBoard.taskItem) {
        //     await this.taskItemRepository.update({ positionId: position }, { where: { id: item.id } })
        //     position++;
        // }
        updatedTasksBoard.taskItem.map((item) => {
            // console.log(position, 'position');

            // if (updatedTasksBoard.id !== item.tasksBoardId) {
            this.taskItemRepository.update({ tasksBoardId: updatedTasksBoard.id }, { where: { id: item.id } })
            // }
            this.taskItemRepository.update({ positionId: position }, { where: { id: item.id } })
            position++;

            // return this.tasksBoardRepository.findByPk(
            //     updatedTasksBoard.id,
            // );
        });

        // return await updatedTasksBoard;
        // console.log('before end');

        return await this.tasksBoardRepository.findByPk(updatedTasksBoard.id, {include: {all: true}});


        // return await this.taskBoardService.getAllTasksBoard();
    }

    async deleteTaskItemById(id: string) {
        return await this.taskItemRepository.destroy({ where: { id } });
    }

    async getTaskItemById(id: string) {
        // return await this.taskItemRepository.findByPk(id, {
        //     include: { all: true },
        // });

        return await this.taskItemRepository.findByPk(id, {
            include: [
                {
                    all: true,
                    model: TasksBoard,
                    include: [
                        {
                            all: true,
                        },
                    ],
                },
                {
                    model: User,
                    as: 'creatorUser',
                    attributes: ['email', 'firstName', 'lastName'],
                },
                {
                    model: User,
                    as: 'updatedUser',
                    attributes: ['email', 'firstName', 'lastName'],
                },
            ],
        });
    }
}
