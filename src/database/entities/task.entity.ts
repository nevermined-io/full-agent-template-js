import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ExecutionStatus } from 'src/common/models/agent-models'
import { v4 as uuidv4 } from 'uuid'

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryColumn({ unique: true })
  task_id: string

  @Column({
    // enum: Object.values(ExecutionStatus),
    enum: ExecutionStatus,
    type: 'simple-enum'
  })
  task_status: ExecutionStatus

  @Column('varchar')
  name: string

  @Column('text')
  input_query: string

  @Column('text')
  input_params: string

  @Column('text')
  input_artifacts: string

  @Column('text')
  output: string

  @Column('text')
  output_additional: string

  @Column('text')
  output_artifacts: string

  constructor() {
    super()
    this.task_id = `task-${uuidv4()}`
    this.task_status = ExecutionStatus.PENDING
  }
}
