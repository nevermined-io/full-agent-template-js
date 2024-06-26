import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { HttpsRedirectMiddleware } from '../common/middleware/https-redirection.middleware'
import { RouterModule } from '@nestjs/core/router/router-module'
import { routes } from 'src/routes'
import { AgentModule } from './agent/agent.module'
import { InfoModule } from './info/info.module'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from '../configuration'
import { EntityModule } from './entity.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig], // define a function that returns the configuration object
      ignoreEnvFile: true, // we don't need .env files because we're using environment variables
      isGlobal: true, // we can access the configuration everywhere in the app
      cache: true // cache the configuration
    }),
    EntityModule,
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
