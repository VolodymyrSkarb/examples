import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateTasksBoardDto } from './dto/create-tasks-board.dto';
import { TasksBoardService } from './tasks-board.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksBoard } from './tasks-board.model';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateTasksBoardDto } from './dto/update-tasks-board.dto';

@ApiTags('Tasks Board')
@Controller('tasks-board')
export class TasksBoardController {
    constructor(private tasksBoardService: TasksBoardService) {}

    @ApiOperation({ summary: 'Create Tasks Board' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() tasksBoardDto: CreateTasksBoardDto) {
        return this.tasksBoardService.createTasksBoard(tasksBoardDto);
    }

    @ApiOperation({ summary: 'Get Tasks Board' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.tasksBoardService.getTasksBoardById(value);
    }

    @ApiOperation({ summary: 'Get All Tasks Board By Project' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Get('all-panels/:value')
    getByProject(@Param('value') value: string) {
        return this.tasksBoardService.getAllTasksBoardByProjectId(value);
    }

    @ApiOperation({ summary: 'Update Tasks Board' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateTasksBoard(@Body() updateTasksBoardDto: UpdateTasksBoardDto) {
        return this.tasksBoardService.updateTasksBoard(updateTasksBoardDto);
    }

    @ApiOperation({ summary: 'Update Tasks Board Order' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Patch('order-list/')
    updateTasksBoardOrder(@Body() updatedTasksBoard: TasksBoard[]) {
        return this.tasksBoardService.updateOrder(updatedTasksBoard);
    }

    @ApiOperation({ summary: 'Delete Tasks Board' })
    @ApiResponse({ status: 200, type: TasksBoard })
    @UseGuards(JwtAuthGuard)
    @Delete('/:value')
    deleteTasksBoard(@Param('value') value: string) {
        return this.tasksBoardService.deleteTasksBoardById(value);
    }
}
