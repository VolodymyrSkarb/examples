import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @ApiOperation({ summary: 'Create project' })
    @ApiResponse({ status: 200, type: Project })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto);
    }

    @ApiOperation({ summary: 'Delete Project' })
    @ApiResponse({ status: 200, type: Project })
    @UseGuards(JwtAuthGuard)
    @Delete('/:value')
    deleteTasksBoard(@Param('value') value: string) {
        return this.projectService.deleteProjectById(value);
    }

    @ApiOperation({ summary: 'Get Project' })
    @ApiResponse({ status: 200, type: Project })
    @UseGuards(JwtAuthGuard)
    @Get('/:value')
    getByValue(@Param('value') value: number) {
        return this.projectService.getProjectById(value);
    }

    @ApiOperation({ summary: 'Get All Project' })
    @ApiResponse({ status: 200, type: [Project] })
    @UseGuards(JwtAuthGuard)
    @Get('all-projects/:value')
    getAllProject(@Param('value') value: number) {
        return this.projectService.getAllUserProjects(value);
    }
}
