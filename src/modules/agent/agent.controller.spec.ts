import { Test, TestingModule } from '@nestjs/testing'
import { AgentService } from './agent.service'
import { AgentController } from './agent.controller'
import { ConfigService } from '@nestjs/config'

describe('AppController', () => {
  let appController: AgentController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [AgentService, ConfigService]
    }).compile()

    appController = app.get<AgentController>(AgentController)
  })

  describe('root', () => {
    it('should return a list of tasks"', () => {
      expect(appController.getAgentTasks()).toBeInstanceOf(Array)
    })
  })
})
