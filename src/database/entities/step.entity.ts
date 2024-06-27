import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ExecutionStatus } from '../../common/models/agent-models'
import { v4 as uuidv4 } from 'uuid'

@Entity('steps')
export class StepEntity extends BaseEntity {
  @PrimaryColumn({ unique: true })
  step_id: string

  @Column('varchar')
  task_id: string

  @Column('varchar')
  name: string

  @Column('integer')
  retries: number

  @Column('integer')
  cost: number

  @Column('boolean')
  is_last: boolean

  @Column({
    enum: ExecutionStatus,
    type: 'simple-enum'
  })
  step_status: ExecutionStatus

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
    this.step_id = `step-${uuidv4()}`
    this.step_status = ExecutionStatus.PENDING
    this.retries = 0
  }
}
