import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { AgentsFactory } from '../../common/utils/agents-factory'

@Injectable()
export class AgentService {
  createAgentTask(agentTaskDto: CreateTaskDto) {
    const task = AgentsFactory.getTaskFromTemplate(agentTaskDto)
    return task
  }

  getTaskById(taskId: string) {
    return {
      task_id: taskId,
      status: 'PENDING',
      created_at: new Date(),
      updated_at: new Date()
    }
  }

  listTasks() {
    return []
  }
}
