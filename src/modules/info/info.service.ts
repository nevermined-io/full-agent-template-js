import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { readFileSync } from 'fs'
import { join } from 'path'

@Injectable()
export class InfoService {
  constructor(private readonly config: ConfigService) {}

  getApiInfo() {
    const packageJsonPath = join(__dirname, '../../../', 'package.json')
    const packageJsonString = readFileSync(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonString) as {
      version: string
      name: string
    }

    const nvmConfig = {}
    const nvmEnvironment = this.config.get('nvm.environment')
    if (nvmEnvironment) {
      nvmConfig['environment'] = nvmEnvironment
      nvmConfig['agent_did'] = this.config.get('nvm.agentDid')
      nvmConfig['subscription_did'] = this.config.get('nvm.subscriptionDid')
    }

    return {
      name: packageJson.name,
      version: packageJson.version,
      swagger: `${this.config.get('api.url')}/api/v1/docs`,
      openapi: `${this.config.get('api.url')}/api/v1/docs-json`,
      ...nvmConfig
    }
  }
}
