import { Logger, OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { sleep } from '../common/utils/utils'
import { AgentService } from '../api/agent/agent.service'
import { TaskEntity } from '../database/entities/task.entity'
import { StepEntity } from '../database/entities/step.entity'
import { ExecutionStatus } from 'src/common/models/agent-models'

@Injectable()
export class ProcessorController implements OnModuleInit {
  constructor(
    private readonly agentService: AgentService,
    private readonly config: ConfigService
  ) {}

  async onModuleInit() {
    const agentSleepDuration = this.config.get('processor.sleepDuration')
    while (true) {
      Logger.debug(`Processor Controller is running...`)
      await this.processTasks()
      await sleep(agentSleepDuration)
    }
  }

  async processTasks() {
    // 1. Get all pending tasks from the database
    const pendingTasks = await this.agentService.getPendingTasksFromDb()
    pendingTasks.map(async (task) => {
      await this.processTask(task)
    })

    // X. All the tasks that are having all the steps finished are marked as completed
    await this.agentService.completeTasksWhenStepsAreDone()

    // X. All the tasks with more than Y number of retries are marked as failed
    await this.agentService.markTasksAsFailedAfterRetries()
  }

  async processTask(task: TaskEntity) {
    Logger.debug(`Processing task: ${task.task_id}`)

    // Get all the steps for the task that are still pending
    const pendingSteps = await this.agentService.getPendingStepsForTask(task)

    pendingSteps.map(async (step) => {
      await this.processStep(step, task)
    })
  }

  async processStep(step: StepEntity, task: TaskEntity) {
    Logger.log(`[${task.task_id}] Processing step: ${step.step_id}`)

    const randomIndex = Math.floor(Math.random() * 10)
    if (randomIndex === 0) {
      Logger.log(`[${task.task_id}] Simulate a step that is still in progress`)
      await this.agentService.updateStep(step.step_id, {
        step_status: ExecutionStatus.IN_PROGRESS,
        retries: step.retries + 1
      })
    } else if (randomIndex === 1) {
      Logger.log(`[${task.task_id}] Simulate a step that is failing`)
      await this.agentService.updateStep(step.step_id, {
        step_status: ExecutionStatus.FAILED,
        output: `{"result": 500, "message": "Failed because ${randomIndex} is 1"}`
      })
    } else {
      // Simulate a successful step
      Logger.log(`[${task.task_id}] Simulate a step that is completed`)
      await this.agentService.updateStep(step.step_id, {
        step_status: ExecutionStatus.COMPLETED,
        is_last: true,
        output: `{"result": 200, "message": "${randomIndex}"}`
      })
    }
  }
}
