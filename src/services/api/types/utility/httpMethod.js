import { HttpMethods } from '../enums';
export const readMethods = [HttpMethods.GET];
export const writeMethods = [
    HttpMethods.POST,
    HttpMethods.PUT,
    HttpMethods.DELETE,
];
export const fullMethods = [...readMethods, ...writeMethods];
