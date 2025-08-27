import { IHttpClient } from '../core'
import {
  HttpMethods,
  AuthUserTokens,
  AuthUserServices,
  RequestBody,
} from '../../types'

import { toMethodKeys } from '../../utils'

export class AuthUserController extends IHttpClient {
  constructor(config?: { headers?: Record<string, string> }) {
    super({
      url: '/auth/api/v1',
      headers: config?.headers,
    })
  }

  public auth = this.requestMethods<AuthUserTokens>(
    '/token',
    toMethodKeys([HttpMethods.POST]),
  ) as { post: (body?: RequestBody) => Promise<AuthUserTokens> }

  public refresh = this.requestMethods<AuthUserTokens>(
    '/refresh',
    toMethodKeys([HttpMethods.POST]),
  ) as { post: (body?: RequestBody) => Promise<AuthUserTokens> }

  public services = this.requestMethods<AuthUserServices>(
    '/services',
    toMethodKeys([HttpMethods.GET]),
  ) as { get: () => Promise<AuthUserServices> }
}
