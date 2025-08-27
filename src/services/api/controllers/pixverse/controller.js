import { IHttpClient } from '../core';
import { fullMethods, writeMethods, } from '../../types';
import { toMethodKeys } from '../../utils';
export class PixverseController extends IHttpClient {
    constructor() {
        super({
            url: '/pixverse/api/v1',
        });
    }
    accounts = this.requestMethods('/accounts', toMethodKeys(fullMethods));
    templates = this.requestMethods('/templates', toMethodKeys(fullMethods));
    styles = this.requestMethods('/styles', toMethodKeys(fullMethods));
    applications = this.requestMethods('/applications', toMethodKeys(writeMethods));
}
