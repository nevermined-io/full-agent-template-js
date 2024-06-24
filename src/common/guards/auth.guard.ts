import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { extractAuthTokenFromHeader } from '../utils/utils'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    private _reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const apiAuthToken = this.config.get('api.authToken')
    if (!apiAuthToken) return true

    const request = context.switchToHttp().getRequest()
    const token = extractAuthTokenFromHeader(request)
    if (!token || token !== apiAuthToken) {
      throw new UnauthorizedException(`Invalid Authorization token`)
    }
    return true
  }
}
