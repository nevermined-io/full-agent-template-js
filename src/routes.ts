import { Routes } from '@nestjs/core'
import { InfoModule } from './modules/info/info.module'
import { AgentModule } from './modules/agent/agent.module'

export const routes: Routes = [
  {
    path: '/v1/agent/tasks',
    module: AgentModule
  },
  {
    path: '/',
    module: InfoModule
  }
]
