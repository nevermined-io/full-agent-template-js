import { Module } from '@nestjs/common'
import { InfoController } from './info.controller'
import { InfoService } from './info.service'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [InfoService, ConfigService]
})
export class InfoModule {}
