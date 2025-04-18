import { Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignProjectDto } from './dto/assign-project.dto';
import { TaskItem } from '../projects/tasks-board/task-item/task-item.model';
import { UpdateUserDto, UploadImageDto } from './dto/update-user.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import File from ''

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Assign Role' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Post('/role')
    assignRole(@Body() dto: AssignRoleDto) {
        return this.usersService.assignRole(dto);
    }

    @ApiOperation({ summary: 'Assign Project' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/project')
    assignProject(@Body() dto: AssignProjectDto) {
        return this.usersService.assignProject(dto);
    }

    @ApiOperation({ summary: 'Assign Task' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/task')
    assignTask(@Body() dto: AssignTaskDto) {
        return this.usersService.assignTask(dto);
    }

    @ApiOperation({ summary: 'Update User Info' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateTaskItem(@Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(updateUserDto);
    }

    @ApiOperation({ summary: 'Upload User Avatar' })
    @ApiResponse({ status: 200, type: TaskItem })
    @UseGuards(JwtAuthGuard)
    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadAvatar(@Body() userId: UploadImageDto, @UploadedFile() image) {
        return this.usersService.uploadFile(userId, image);
    }
}
