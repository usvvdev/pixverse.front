import { IHttpClient } from '../core'
import {
  AccountPixverse,
  StylePixverse,
  TemplatePixverse,
  ApplicationPixverse,
  fullMethods,
  writeMethods,
} from '../../types'

import { toMethodKeys } from '../../utils'

export class TopmediaController extends IHttpClient {
  constructor(config?: { headers?: Record<string, string> }) {
    super({
      url: '/topmedia/api/v1',
      headers: config?.headers,
    })
  }

  public voices = this.requestMethods('/voices', toMethodKeys(fullMethods))
}
