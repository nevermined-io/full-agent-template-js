import { NestFactory } from '@nestjs/core'
import { ConsoleLogger, Logger } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import { ProcessorModule } from './processor/processor.module'

async function bootstrap() {
  const packageJsonPath = join(__dirname, '../', 'package.json')
  const packageJsonString = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonString) as {
    version: string
    name: string
  }

  const app = await NestFactory.createApplicationContext(ProcessorModule, {
    logger: ['log', 'error', 'warn']
  })
  const config = app.get(ConfigService)

  app.useLogger(
    new ConsoleLogger('processor', {
      timestamp: true,
      logLevels: config.get('log.levels')
    })
  )
  Logger.log(`👾 Agent Requests Processor ${packageJson.version} is running`)
}

bootstrap()
