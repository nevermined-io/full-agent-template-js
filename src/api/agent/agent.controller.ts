import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
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
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@ApiTags('Agent')
@Controller()
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('Authorization')
export class AgentController {
  static readonly DEFAULT_COST_CREDITS = '1'
  static readonly NVM_COST_HEADER = 'NVMCreditsConsumed'

  constructor(
    private readonly agentService: AgentService,
    private readonly configService: ConfigService
  ) {}

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
  async createAgentTask(
    @Body() agentTaskDto: CreateTaskDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const task = await this.agentService.createAgentTask(agentTaskDto)
    const createTaskCost = this.configService.get('nvm.credits.createTask')
    if (createTaskCost > 0) {
      response.setHeader(
        this.configService.get('nvm.credits.header'),
        createTaskCost
      )
    }
    return task
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
  async getAgentTask(
    @Param('task_id') taskId: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const fullTask = await this.agentService.getTaskById(taskId)
    const taskCost =
      fullTask.task.cost || this.configService.get('nvm.credits.getTask')
    response.setHeader(this.configService.get('nvm.credits.header'), taskCost)
    return {
      task: fullTask.task,
      steps: fullTask.steps
    }
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
