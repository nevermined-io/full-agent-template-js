import { ExecutionInput, ExecutionStatus, Task } from '../models/agent-models'
import { v4 as uuidv4 } from 'uuid'

export abstract class AgentsFactory {
  static getTaskFromTemplate(input: ExecutionInput | string) {
    if (typeof input === 'string') {
      input = {
        query: input
      }
    }
    const task_id = `task-${uuidv4()}`
    const task: Task = {
      task_id,
      name: '',
      input,
      status: ExecutionStatus.PENDING,
      steps: [AgentsFactory.getStepFromTemplate(input, task_id)],
      created_at: new Date(),
      updated_at: new Date()
    }
    return task
  }

  static getStepFromTemplate(
    input: ExecutionInput | string,
    task_id: string,
    isLast = false
  ) {
    if (typeof input === 'string') {
      input = {
        query: input
      }
    }
    return {
      step_id: `step-${uuidv4()}`,
      task_id,
      input,
      status: ExecutionStatus.PENDING,
      is_last: isLast,
      retries: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}
