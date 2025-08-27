import { IHttpClient } from '../core';
import { fullMethods, writeMethods, } from '../../types';
import { toMethodKeys } from '../../utils';
export class ChatGPTController extends IHttpClient {
    constructor() {
        super({
            url: '/chatgpt/api/v1',
        });
    }
    templates = this.requestMethods('/templates', toMethodKeys(fullMethods));
    applications = this.requestMethods('/applications', toMethodKeys(writeMethods));
}
