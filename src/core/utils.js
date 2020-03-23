export function isNumber(val) {
    return typeof val === 'number';
}
export function isString(val) {
    return typeof val === 'string';
}
export function isPromise(val) {
    return val && val.constructor === Promise;
}
export function isFunction(val) {
    return typeof val === 'function';
}
export function isBoolean(val) {
    return typeof val === 'boolean';
}
export function isArray(val) {
    return Array.isArray(val);
}