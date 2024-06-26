import { Routes } from '@nestjs/core'
import { InfoModule } from './api/info/info.module'
import { AgentModule } from './api/agent/agent.module'

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
