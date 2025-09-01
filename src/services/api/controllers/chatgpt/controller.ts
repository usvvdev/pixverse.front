import { IHttpClient } from '../core'
import {
  TemplateChatGPT,
  ApplicationChatGPT,
  fullMethods,
  writeMethods,
} from '../../types'

import { toMethodKeys } from '../../utils'

export class ChatgptController extends IHttpClient {
  constructor() {
    super({
      url: '/chatgpt/api/v1',
    })
  }

  public templates = this.requestMethods<TemplateChatGPT>(
    '/templates',
    toMethodKeys(fullMethods),
  )
  public applications = this.requestMethods<ApplicationChatGPT>(
    '/applications',
    toMethodKeys(writeMethods),
  )
  public styles = this.requestMethods<ApplicationChatGPT>(
    '/styles',
    toMethodKeys(fullMethods),
  )
}
