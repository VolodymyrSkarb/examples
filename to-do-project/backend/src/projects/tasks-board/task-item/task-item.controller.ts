import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskItem } from './task-item.model';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { TaskItemService } from './task-item.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { TasksBoard } from '../tasks-board.model';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';

@ApiTags('Task Item')
@Controller('task-item')
export class TaskItemController {
    constructor(private taskItemService: TaskItemService) {}

    @ApiOperation({ summary: 'Create task' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() taskItemDto: CreateTaskItemDto) {
        return this.taskItemService.createTaskItem(taskItemDto);
    }

    @ApiOperation({ summary: 'Update Task' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateTaskItem(@Body() updateTaskItemDto: UpdateTaskItemDto) {
        return this.taskItemService.updateTaskItem(updateTaskItemDto);
    }

    @ApiOperation({ summary: 'Update Task Order' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Patch('/order-list/:value')
    updateTaskItemOrder(@Body() updatedTasksBoard: TasksBoard) {
        return this.taskItemService.updateOrder(updatedTasksBoard);
    }

    @ApiOperation({ summary: 'Delete Task Item' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Delete('/:value')
    deleteTask(@Param('value') value: string) {
        return this.taskItemService.deleteTaskItemById(value);
    }

    @ApiOperation({ summary: 'Get Task Item' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Get('/:value')
    deleteTasksBoard(@Param('value') value: string) {
        return this.taskItemService.getTaskItemById(value);
    }
}
