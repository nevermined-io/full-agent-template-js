import { Module } from '@nestjs/common'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity } from '../../database/entities/task.entity'
import { StepEntity } from '../../database/entities/step.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, StepEntity])],
  controllers: [AgentController],
  providers: [AgentService]
})
export class AgentModule {}
