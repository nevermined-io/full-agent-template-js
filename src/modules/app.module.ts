import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { HttpsRedirectMiddleware } from '../common/middleware/https-redirection.middleware'
import { RouterModule } from '@nestjs/core/router/router-module'
import { routes } from 'src/routes'
import { AgentModule } from './agent/agent.module'
import { InfoModule } from './info/info.module'
import { ConfigModule } from '@nestjs/config'
import configuration from 'src/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // load the configuration definition from the configuration file
      ignoreEnvFile: true, // we don't need .env files because we're using environment variables
      isGlobal: true, // we can access the configuration everywhere in the app
      cache: true // cache the configuration
    }),
    RouterModule.register(routes),
    InfoModule,
    AgentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpsRedirectMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
