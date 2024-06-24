import { Module } from '@nestjs/common'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity } from 'src/database/entities/task.entity'
import { StepEntity } from 'src/database/entities/step.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, StepEntity])],
  controllers: [AgentController],
  providers: [AgentService]
})
export class AgentModule {}
