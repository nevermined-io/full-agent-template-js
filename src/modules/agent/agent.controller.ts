import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AgentService } from './agent.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateTaskDto } from './dto/create-task-dto'
import { AuthorizationGuard } from '../../common/guards/auth.guard'

@ApiTags('Agent')
@Controller()
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('Authorization')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperation({
    description: 'Creates a task for the agent',
    summary: 'Public'
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @UsePipes(new ValidationPipe())
  async createAgentTask(@Body() agentTaskDto: CreateTaskDto) {
    return this.agentService.createAgentTask(agentTaskDto)
  }

  @Get(':task_id')
  @ApiOperation({
    description: 'Get the agent task by ID',
    summary: 'Public'
  })
  @ApiResponse({
    status: 200,
    description: 'Return the task details'
  })
  getAgentTask(@Param('task_id') taskId: string) {
    return this.agentService.getTaskById(taskId)
  }

  @Get()
  @ApiOperation({
    description: 'Get a list of all the agent tasks',
    summary: 'Public'
  })
  @ApiResponse({
    status: 200,
    description: 'Return the list of tasks'
  })
  getAgentTasks() {
    return this.agentService.listTasks()
  }
}
