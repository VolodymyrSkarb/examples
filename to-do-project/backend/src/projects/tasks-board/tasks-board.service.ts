import { Injectable } from '@nestjs/common';
import { CreateTasksBoardDto } from './dto/create-tasks-board.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TasksBoard } from './tasks-board.model';
import { UpdateTasksBoardDto } from './dto/update-tasks-board.dto';
import { TaskItem } from './task-item/task-item.model';
import { User } from "../../users/users.model";
import { Project } from "../projects.model";

@Injectable()
export class TasksBoardService {
    constructor(
        @InjectModel(TasksBoard)
        private tasksBoardRepository: typeof TasksBoard,

        @InjectModel(TaskItem)
        private taskItemRepository: typeof TaskItem,
    ) {}

    async createTasksBoard(dto: CreateTasksBoardDto) {
        const tasksBoard = await this.tasksBoardRepository.create(dto);

        return await this.getTasksBoardById(tasksBoard.id);
    }

    async getAllTasksBoard() {
        return await this.tasksBoardRepository.findAll({include: {all: true, order: [['positionId', 'ASC']],}});
    }

    async getTasksBoardById(id: string) {
        return await this.tasksBoardRepository.findOne({ where: { id }, include: { all: true } });
        // return await this.tasksBoardRepository.findOne({ where: { id }, include: [
        //         {
        //             model: Project,
        //             attributes: ['name'],
        //             all: true,
        //         },
        //     ],
        // });
    }

    async getAllTasksBoardByProjectId(id: string) {
        return await this.tasksBoardRepository.findAll({
            include: [
                {
                    all: true,
                },
                {
                    model: Project,
                    where: { id: id },
                    // all: true,
                },
            ],
        });
    }

    async updateTasksBoard(dto: UpdateTasksBoardDto) {
        await this.tasksBoardRepository.update(dto, {
            where: { id: dto.id },
        });

        return await this.tasksBoardRepository.findByPk(dto.id, {
            include: { all: true },
        });
    }

    async updateOrder(updatedTasksBoard: TasksBoard[]) {
        let position = 1;
        updatedTasksBoard.map((item) => {
            this.tasksBoardRepository.update({ positionId: position }, { where: { id: item.id } })
            position++;
        });
    }

    async deleteTasksBoardById(id: string) {
        return await this.tasksBoardRepository.destroy({ where: { id } });
    }
}
