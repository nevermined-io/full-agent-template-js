import { DataSource } from 'typeorm'
import { testConfig } from '../../configuration.tests'
import { ConfigService } from '@nestjs/config'
import { CreateTaskDto } from './dto/create-task-dto'
import fetch from 'node-fetch'

describe('AppController', () => {
  // let appController: AgentController
  // beforeEach(async () => {
  //   const appModule: TestingModule = await Test.createTestingModule({
  //     // imports: [TypeOrmModule.forFeature([TaskEntity, StepEntity])],
  //     imports: [],
  //     controllers: [AgentController],
  //     providers: [
  //       { provide: AgentService, useValue: undefined },
  //       { provide: getRepositoryToken(TaskEntity), useClass: TaskEntity },
  //       { provide: getRepositoryToken(StepEntity), useClass: StepEntity }
  //     ]
  //   }).compile()
  //   await appModule.init()
  //   // appController = app.get<AgentController>(AgentController)
  // })
  let dataSource: DataSource
  let configService: ConfigService
  const TASKS_ENDPOINT = '/api/v1/agent/tasks'

  beforeAll(async () => {
    configService = new ConfigService(testConfig)

    console.log('Connecting to database')
    //@ts-expect-error-next-line
    dataSource = new DataSource({
      type: configService.get('database.type'),
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get<string>('database.password'),
      database: configService.get('database.name'),
      logging: ['query', 'log', 'error', 'warn', 'info'],
      entities: [],
      synchronize: true
      // logging: true
    })
    await dataSource.initialize()
    console.log('Conection to database established')
  })

  afterAll(async () => {
    try {
      if (dataSource.isInitialized) {
        await dataSource.query('DELETE FROM steps ')
        console.log('Closing database connection ..')
        dataSource.destroy()
      }
    } catch (error) {
      console.warn('Error deleting content from db')
    }
  })

  describe('root', () => {
    it('Can create a task', async () => {
      const task = new CreateTaskDto()
      task.query = 'My test query'
      task.additional_params = [{ param1: 'value1' }, { param2: 'value2' }]
      task.artifacts = [{ artifact_id: 'art-0123', url: 'https://url.test' }]
      createTask(task).then((response) => {
        expect(response.status).toBe(201)
      })
    })
  })

  async function createTask(createTaskDto: CreateTaskDto) {
    console.log(`Creating task: ${configService.get('api.url')}`)
    return fetch(`${configService.get('api.url')}${TASKS_ENDPOINT}`, {
      method: 'post',
      body: JSON.stringify(createTaskDto),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configService.get('api.authToken')}`
      }
    })
    // return request(configService.get('api.url'))
    //   .post(TASKS_ENDPOINT)
    //   .set('Accept', 'application/json')
    //   .set('Authorization', `Bearer ${configService.get('api.authToken')}`)
    //   .send(createTaskDto)
  }
})
