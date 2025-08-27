import { IHttpClient } from '../core'
import {
  HttpMethods,
  AuthUserTokens,
  AuthUserServices,
  RequestBody,
} from '../../types'

import { toMethodKeys } from '../../utils'

export class DashboardController extends IHttpClient {
  constructor(config?: { headers?: Record<string, string> }) {
    super({
      url: '/dashboard/api/v1',
      headers: config?.headers,
    })
  }

  public products = this.requestMethods(
    '/products',
    toMethodKeys([HttpMethods.GET]),
  )

  public applications = this.requestMethods(
    '/store_applications',
    toMethodKeys([HttpMethods.GET]),
  )
}
