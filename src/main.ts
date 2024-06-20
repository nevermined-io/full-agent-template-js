import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConsoleLogger, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { readFileSync } from 'fs'
import { join } from 'path'
import { AppModule } from './modules/app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'log', 'warn'],
    cors: true,
    rawBody: true
  })
  const config = app.get(ConfigService)

  const apiPort = config.get('api.port')
  const apiHost = config.get('api.host')
  const apiUrl = config.get('api.url')

  const globalPrefix = 'api'
  app.enable('trust proxy')
  app.setGlobalPrefix(globalPrefix)

  const packageJsonPath = join(__dirname, '../', 'package.json')
  const packageJsonString = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonString) as {
    version: string
    name: string
  }

  app.useLogger(
    new ConsoleLogger('api', {
      timestamp: true,
      logLevels: config.get('log.levels')
    })
  )

  const options = new DocumentBuilder()
    .setTitle('Agent Api')
    .setVersion(packageJson.version)
    .addServer(apiUrl)
    .addTag(packageJson.name, 'Nevermined Agent API')
    .addBearerAuth({ type: 'http' }, 'Authorization')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api/v1/docs', app, document, { explorer: true })

  Logger.log(
    `🚀 API version ${packageJson.version} is running on: ${apiUrl}/${globalPrefix}`
  )

  await app.listen(apiPort, apiHost)
}

bootstrap()
