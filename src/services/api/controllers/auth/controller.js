import { IHttpClient } from '../core';
import { HttpMethods, } from '../../types';
import { toMethodKeys } from '../../utils';
export class AuthUserController extends IHttpClient {
    constructor(config) {
        super({
            url: '/auth/api/v1',
            headers: config?.headers,
        });
    }
    auth = this.requestMethods('/token', toMethodKeys([HttpMethods.POST]));
    refresh = this.requestMethods('/refresh', toMethodKeys([HttpMethods.POST]));
    services = this.requestMethods('/services', toMethodKeys([HttpMethods.GET]));
}
