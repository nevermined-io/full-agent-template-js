import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { TABLE_STEPS, TABLE_TASKS, baseSchema } from './schema'
import { ExecutionStatus } from '../common/models/agent-models'

export class AgentBase1718898482722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_TASKS,
        columns: [
          {
            name: 'task_id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'task_status',
            type: 'enum',
            default: "'PENDING'",
            enum: Object.values(ExecutionStatus)
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'input_query',
            type: 'text',
            isNullable: false
          },
          {
            name: 'input_params',
            type: 'text',
            isNullable: true
          },
          {
            name: 'input_artifacts',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output_additional',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output_artifacts',
            type: 'text',
            isNullable: true
          },
          ...baseSchema
        ]
      }),
      true
    )

    await queryRunner.createTable(
      new Table({
        name: TABLE_STEPS,
        columns: [
          {
            name: 'step_id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'task_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'is_last',
            type: 'boolean',
            default: false,
            isNullable: false
          },
          {
            name: 'step_status',
            type: 'enum',
            default: "'PENDING'",
            enum: Object.values(ExecutionStatus)
          },
          {
            name: 'input_query',
            type: 'text',
            isNullable: false
          },
          {
            name: 'input_params',
            type: 'text',
            isNullable: true
          },
          {
            name: 'input_artifacts',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output_additional',
            type: 'text',
            isNullable: true
          },
          {
            name: 'output_artifacts',
            type: 'text',
            isNullable: true
          },
          ...baseSchema
        ]
      }),
      true
    )

    const foreignKeyRuleTasks = new TableForeignKey({
      name: 'tasksStepsByTaskId',
      columnNames: ['task_id'],
      referencedColumnNames: ['task_id'],
      referencedTableName: TABLE_TASKS,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    })
    await queryRunner.createForeignKey(TABLE_STEPS, foreignKeyRuleTasks)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE_STEPS, 'tasksStepsByTaskId')

    await queryRunner.dropTable(TABLE_STEPS)
    await queryRunner.dropTable(TABLE_TASKS)
  }
}
