import { isFunction, isPromise, isBoolean, isString, isUnDef } from './utils';
import { close, last } from '../manager';
const key = '__mx-evt';

function handleAction(el) {
    const { _index, _onclick } = el;
    if (!isFunction(_onclick)) {
        return
    }
    let action = isUnDef(_index) ? null : this._actions[_index];
    const res = _onclick.call(this, this._inputVal);


    if (isPromise(res)) {
        if (action) {
            action.loading = true;
        }
        res.then(isClose => {
            if (isBoolean(isClose)) {
                isClose && close(this._id);
            } else {
                close(this._id);
            }
        }, () => {
            if (action) {
                action.loading = false;
            }
        });
    } else {
        isBoolean(res) && res && close(this._id);
    }
    this._actions = [...this._actions];
}


document.addEventListener('keydown', evt => {
    const modal = last();

    if (evt.keyCode === 27 && modal && modal._escClose && modal._isShow) {
        close(modal._id);
    }
});


export default function initEvent() {
    const { _el } = this;
    if (this[key]) {
        return;
    }
    const handleClick = evt => {
        evt.stopPropagation();
        if (evt.target.className === 'mx-overlay' && this._shadowClose) {
            close(this._id);
            return;
        }
        handleAction.call(this, evt.target);
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