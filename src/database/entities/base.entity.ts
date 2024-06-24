import { Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
