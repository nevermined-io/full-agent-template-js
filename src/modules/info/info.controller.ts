import { Controller, Get } from '@nestjs/common'
import { InfoService } from './info.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller()
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOperation({
    description: 'Get API info',
    summary: 'Public'
  })
  @ApiResponse({
    status: 200,
    description: 'Return API Info'
  })
  getInfo() {
    return this.infoService.getApiInfo()
  }
}
