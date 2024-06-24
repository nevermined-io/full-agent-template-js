export const baseSchema = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()'
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()'
  }
]

export const TABLE_TASKS = 'tasks'
export const TABLE_STEPS = 'steps'
