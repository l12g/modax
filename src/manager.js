import Modax from './core/instance';
import { isString, isNumber } from './core/utils';

export const stack = [];
export function remove(ins) {
    const id = isString(ins) ? ins : ins._id;
    let i = stack.length;
    while (i--) {
        if (stack[i]._id === id) {
            stack.splice(i, 1);
            return;
        }
    }
}
export function create(id) {
    const mod = new Modax(id);
    stack.push(mod);
    return mod;
}

export function first() {
    return stack[0];
}
export function last() {
    return stack[stack.length - 1];
}
export function close(id) {
    if (!stack.length === 0) {
        return;
    }
    let i = stack.length;
    const hasId = typeof id !== 'undefined';
    if (hasId) {
        const _id = isString(id) || isNumber(id) ? id : id._id;
        while (i--) {
            if (_id === stack[i]._id) {
                stack[i].close();
                stack.splice(i, 1);
            }
        }
    } else {
        while (i--) {
            stack[i].close();
        }
        stack.length = 0;
    }
}