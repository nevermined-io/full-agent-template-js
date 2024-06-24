import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { AgentsFactory } from '../../common/utils/agents-factory'
import { TaskEntity } from 'src/database/entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { StepEntity } from 'src/database/entities/step.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
    @InjectRepository(StepEntity) private stepEntity: Repository<StepEntity>
  ) {}

  async createAgentTask(agentTaskDto: CreateTaskDto) {
    const task = AgentsFactory.getTaskFromTemplate(agentTaskDto)
    const dbTaskEntity: TaskEntity = {
      ...new TaskEntity(),
      name: task.name,
      input_query: task.input.query,
      input_params: JSON.stringify(task.input.additional_params),
      input_artifacts: JSON.stringify(task.input.artifacts)
    }
    const insertedTask = await this.taskEntity.save(dbTaskEntity)

    const step = AgentsFactory.getStepFromTemplate(
      agentTaskDto,
      insertedTask.task_id
    )
    const dbStepEntity: StepEntity = {
      ...new StepEntity(),
      task_id: step.task_id,
      name: task.name,
      input_query: step.input.query,
      is_last: step.is_last,
      input_params: JSON.stringify(step.input.additional_params),
      input_artifacts: JSON.stringify(step.input.artifacts)
    }
    await this.stepEntity.save(dbStepEntity)

    return insertedTask
  }

  async getTaskById(taskId: string) {
    const steps = await this.stepEntity.find({ where: { task_id: taskId } })
    const task = await this.taskEntity.findOne({ where: { task_id: taskId } })
    return { task, steps }
  }

  listTasks() {
    return []
  }
}
