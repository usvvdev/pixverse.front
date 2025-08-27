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

export class PixverseController extends IHttpClient {
  constructor() {
    super({
      url: '/pixverse/api/v1',
    })
  }

  public accounts = this.requestMethods<AccountPixverse>(
    '/accounts',
    toMethodKeys(fullMethods),
  )
  public templates = this.requestMethods<TemplatePixverse>(
    '/templates',
    toMethodKeys(fullMethods),
  )
  public styles = this.requestMethods<StylePixverse>(
    '/styles',
    toMethodKeys(fullMethods),
  )
  public applications = this.requestMethods<ApplicationPixverse>(
    '/applications',
    toMethodKeys(writeMethods),
  )
}
