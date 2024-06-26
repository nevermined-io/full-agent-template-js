import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { appConfig } from '../configuration'
import { TaskEntity } from 'src/database/entities/task.entity'
import { StepEntity } from 'src/database/entities/step.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // @ts-expect-error-next-line
      useFactory: () => {
        const configService = new ConfigService(appConfig)
        return {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get('database.name'),
          entities: [TaskEntity, StepEntity]
        }
      },
      inject: [ConfigService],
      autoLoadEntities: true
    })
  ],
  providers: []
})
export class EntityModule {}
