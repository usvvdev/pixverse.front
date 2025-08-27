import { IHttpClient } from '../core';
import { HttpMethods, } from '../../types';
import { toMethodKeys } from '../../utils';
export class DashboardController extends IHttpClient {
    constructor(config) {
        super({
            url: '/dashboard/api/v1',
            headers: config?.headers,
        });
    }
    products = this.requestMethods('/products', toMethodKeys([HttpMethods.GET]));
    applications = this.requestMethods('/store_applications', toMethodKeys([HttpMethods.GET]));
}
