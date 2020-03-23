import { Modalx } from './core/instance';
const stack = [];

document.addEventListener('keydown', evt => {
    if (stack.length === 0) {
        return
    }
    const last = stack[stack.length - 1];
    evt.keyCode === 27 && last._esc && last._isShow && close(last._id);
});

export function create() {
    let modal = new Modalx();
    stack.push(modal);
    return modal;
}
export function close(id) {
    let len = stack.length;
    if (len === 0) {
        return;
    }
    if (!id) {
        while (len--) {
            stack[len].close();
        }
        stack.splice(0, Number.MAX_VALUE);
        return;
    }
    const find = stack.findIndex(o => o._id === id);

    find >= 0 && stack[find].close() && stack.splice(find, 1);
}