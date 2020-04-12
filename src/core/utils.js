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
export function isUnDef(val) {
    return typeof val === 'undefined';
}
export function genEachKey() {
    return Math.random().toString(36).slice(-8);
}
export function toCamenCase(val) {
    return val.replace(/[-_]\w/g, $v => {
        return $v[1].toUpperCase();
    })
}