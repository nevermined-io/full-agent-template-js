import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { appConfig } from '../configuration'
import { ProcessorController } from './processor.controller'
import { AgentService } from '../api/agent/agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity } from '../database/entities/task.entity'
import { StepEntity } from '../database/entities/step.entity'
import { EntityModule } from '../api/entity.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, StepEntity]),
    ConfigModule.forRoot({
      load: [() => appConfig], // define a function that returns the configuration object
      ignoreEnvFile: true, // we don't need .env files because we're using environment variables
      isGlobal: true, // we can access the configuration everywhere in the app
      cache: true // cache the configuration
    }),
    EntityModule
  ],
  controllers: [ProcessorController],
  providers: [AgentService, ConfigService]
})
export class ProcessorModule {}
