import defaults from '../core/defaults';
import { close } from '../manager';
let toastWrapper;

export function plugin(text, ms = defaults.toastTime) {
    this._title = text;
    this._el.className = 'mx-toast';
    this._el.style.cssText = '';
    this.ok(false);
    this.cancel(false);
    if (!toastWrapper) {
        toastWrapper = document.createElement('div');
        toastWrapper.className = 'mx-toast-wrap';
        document.body.appendChild(toastWrapper);
    }
    this._container = toastWrapper;
    ms && (this._tid = setTimeout(() => {
        close(this._id);
    }, ms));
    return this;
}

export const template = `<div class='mx-toast__content'>
    <span _text='title'></span>
    <ul class='mx-toast__btns'>
        <li class='mx-toast__btn' 
        on-click='item.click'
        _each='item of actions' 
        _text='item.text' 
        _visible='item.visible'
        _key='item.key'></li>
    </ul>
</div>
`