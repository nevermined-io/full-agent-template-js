import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

@Injectable()
export class HttpsRedirectMiddleware implements NestMiddleware {
  private enableSecure

  constructor(private config: ConfigService) {
    this.enableSecure = config.get('app.enableHttpsRedirect')
  }
  use(req: Request, res: Response, next: () => void) {
    if (this.enableSecure && !req.secure) {
      res.redirect(`https://${req.hostname}${req.originalUrl}`)
    } else {
      next()
    }
  }
}
