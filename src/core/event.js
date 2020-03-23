import { isFunction, isPromise } from './utils';
const key = '__mx-evt';
function handleAction(index) {
    const { type, click } = this._actions[index];
    if (isFunction(click)) {
        const res = click();
        if (isPromise(res)) {
            this._actions[index].loading = true;
            res.then(() => {
                this.close();
                this._actions[index].loading = false;
            }, () => {
                this._actions[index].loading = false;
            });
        } else {
            (type === 'cancel' || type === 'ok') && this.close();
        }
    } else {
        (type === 'cancel' || type === 'ok') && this.close();
    }
    this._actions = [...this._actions];
}

export function initEvent() {
    const { _el } = this;
    if (this[key]) {
        return;
    }
    const handleClick = evt => {
        evt.stopPropagation()
        if (evt.target.classList.contains('mx__btn')) {
            handleAction.call(this, +evt.target.dataset.index);
        }
    }
    const handleAniend = evt => {
        if (evt.target === this._el) {
            if (this._isShow) {
                this._el.remove();
                this._isShow = false;
                clearEvents();
            } else {
                this._isShow = true;
            }
        }
    }
    const clearEvents = () => {
        _el.removeEventListener('animationend', handleAniend);
        _el.removeEventListener('click', handleClick);
        delete this[key];
    }
    _el.addEventListener('animationend', handleAniend);
    _el.addEventListener('click', handleClick);
    Object.defineProperty(this, key, {
        value: true,
        configurable: true
    })
}