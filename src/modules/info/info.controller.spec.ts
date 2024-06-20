import { Test, TestingModule } from '@nestjs/testing'
import { InfoController } from './info.controller'
import { InfoService } from './info.service'
import { ConfigService } from '@nestjs/config'

describe('InfoController', () => {
  let infoController: InfoController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [InfoService, ConfigService]
    }).compile()

    infoController = app.get<InfoController>(InfoController)
  })

  describe('root', () => {
    it('should return the api info', () => {
      expect(infoController.getInfo().swagger).toContain('/api/v1/docs')
    })
  })
})
