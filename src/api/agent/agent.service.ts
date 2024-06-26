import { Injectable, Logger } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { AgentsFactory } from '../../common/utils/agents-factory'
import { TaskEntity } from '../../database/entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { StepEntity } from '../../database/entities/step.entity'
import { MoreThan, Repository } from 'typeorm'
import { ExecutionStatus } from '../../common/models/agent-models'
import { AppDataSource } from '../../database/typeorm.config'

@Injectable()
export class AgentService {
  // The maximum number of retries for a step, after which it is marked as failed
  readonly MAX_STEP_RETRIES = 3
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

  async getPendingTasksFromDb() {
    return this.taskEntity.find({
      where: { task_status: ExecutionStatus.PENDING }
    })
  }

  async getPendingStepsForTask(task: TaskEntity) {
    return this.stepEntity.find({
      where: { step_status: ExecutionStatus.PENDING, task_id: task.task_id }
    })
  }

  updateStep(stepId: string, stepUpdated: Partial<StepEntity>) {
    Logger.log(`Updating step ${stepId}, with ${JSON.stringify(stepUpdated)}`)
    return this.stepEntity.update(
      { step_id: stepId },
      { ...stepUpdated, updated_at: new Date() }
    )
  }

  async completeTasksWhenStepsAreDone() {
    const tasks = await AppDataSource.query(
      `SELECT tasks.task_id as task_id, steps.output as output, steps.output_artifacts as output_artifacts, steps.output_additional as output_additional FROM tasks, steps WHERE tasks.task_id = steps.task_id AND steps.is_last = true AND steps.step_status = \'COMPLETED\' AND tasks.task_status = \'PENDING\' `
    )
    for await (const task of tasks) {
      Logger.log(`Marking task ${task.task_id} as completed`)
      this.taskEntity.update(
        { task_id: task.task_id },
        {
          task_status: ExecutionStatus.COMPLETED,
          output: task.output,
          output_artifacts: task.output_artifacts,
          output_additional: task.output_additional,
          updated_at: new Date()
        }
      )
    }
    return tasks
  }

  async markTasksAsFailedAfterRetries() {
    this.stepEntity.update(
      { retries: MoreThan(this.MAX_STEP_RETRIES) },
      { step_status: ExecutionStatus.FAILED, updated_at: new Date() }
    )
    const tasks = await AppDataSource.query(
      `SELECT tasks.task_id as task_id, steps.output as output, steps.output_artifacts as output_artifacts, steps.output_additional as output_additional FROM tasks, steps WHERE tasks.task_id = steps.task_id AND steps.step_status = \'FAILED\' AND tasks.task_status != \'FAILED\' `
    )
    for await (const task of tasks) {
      Logger.log(`Marking task ${task.task_id} as failed`)
      this.taskEntity.update(
        { task_id: task.task_id },
        {
          task_status: ExecutionStatus.FAILED,
          output: task.output,
          output_artifacts: task.output_artifacts,
          output_additional: task.output_additional,
          updated_at: new Date()
        }
      )
    }
    return tasks
  }
  // async addFirstStepToTask(taskId: string) {
  // }

  // async addLastStepToTask(taskId: string) {
  // }

  async getTaskById(taskId: string) {
    const steps = await this.stepEntity.find({ where: { task_id: taskId } })
    const task = await this.taskEntity.findOne({ where: { task_id: taskId } })
    return { task, steps }
  }

  listTasks() {
    return []
  }
}
