import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { appConfig } from '../configuration'
import { AgentBase1718898482722 } from './1718898482722-AgentBase'

const configService = new ConfigService(appConfig)

console.log(`TYPEORM: Connecting to: ${configService.get('database.type')}`)

//@ts-expect-error-next-line
export const AppDataSource = new DataSource({
  type: configService.get('database.type'),
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get<string>('database.password'),
  database: configService.get('database.name'),
  logging: ['log', 'error', 'warn', 'info'],
  entities: [],
  migrations: [AgentBase1718898482722]
})

AppDataSource.initialize()
  .then(() => {
    console.log(
      `Data Source has been initialized! Type: ${configService.get('database.type')}`
    )
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
