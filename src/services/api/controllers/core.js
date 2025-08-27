import { HttpMethods } from '../types';
export class IHttpClient {
    url;
    headers;
    constructor({ url, headers, }) {
        this.url = url;
        this.headers = {
            'Content-Type': 'application/json',
            ...headers,
        };
    }
    buildQueryString(params) {
        if (!params)
            return '';
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null)
                return;
            if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(key, String(v)));
            }
            else {
                searchParams.set(key, String(value));
            }
        });
        return searchParams.toString() ? `?${searchParams.toString()}` : '';
    }
    async request(endpoint, method, body, query) {
        const queryString = this.buildQueryString(query);
        const response = await fetch(`${this.url}${endpoint}${queryString}`, {
            method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP ${response.status}: ${errorData?.detail || 'Unknown error'}`);
        }
        return response.json();
    }
    requestMethods(path, methodList) {
        const map = {
            get: (query) => this.request(path, HttpMethods.GET, undefined, query),
            delete: (query) => this.request(path, HttpMethods.DELETE, undefined, query),
            put: (body) => this.request(path, HttpMethods.PUT, body),
            post: (body) => this.request(path, HttpMethods.POST, body),
        };
        const result = {};
        methodList.forEach((m) => {
            result[m] = map[m];
        });
        return result;
    }
}
