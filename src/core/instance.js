import { isFunction, isBoolean } from './utils';
import { initDom } from './dom';
import { initEvent } from './event';
import defaults from './defaults';

const DEFAULT_PROMPT_CONFIG = {
    multline: false,
    placeholder: '',
    rows: '6',
    value: "",
    type: 'text',
}
let uid = 0;

function handleBtn(action, ...args) {
    if (args.length === 1) {
        if (isBoolean(args[0]) && !args[0]) {
            action.visible = false;
        } else {
            action[isFunction(args[0]) ? 'click' : 'text'] = args[0];
        }
    }
    if (args.length === 2) {
        if (isFunction(args[0])) {
            throw new Error('invalid parameter')
        }
        action.text = args[0];
        action.click = args[1];
    }
    this._actions = [...this._actions];
    return this;
}

export class Modalx {
    constructor(id) {
        this.init(id || 'mx-' + uid++);
        this._container = document.body;
    }
    init() {
        !this.el && initEvent.call(this, this._el = initDom.call(this));
        this._id = this._id || arguments[0];
        this._el.className = 'mx-overlay';
        this._esc = true;
        this._shadow = false;
        this._loading = false;
        this._title = defaults.titleText;
        this._okAction = {
            text: defaults.okText,
            type: 'ok',
            click: null,
        }
        this._cancelAction = {
            text: defaults.cancelText,
            type: 'cancel',
            click: null,
        }
        this._actions = [
            this._cancelAction,
            this._okAction
        ];
    }

    escClose(val) {
        this._esc = !!val;
        return this;
    }
    shadowClose(val) {
        this._shadow = !!val;
        return this;
    }
    title(val) {
        this._title = val;
        return this;
    }
    content(val) {
        this._content = val;
        return this;
    }

    width(size) {
        this._width = size;
        return this;
    }
    height(size) {
        this._height = size;
        return this;
    }
    ok() {
        return handleBtn.call(this, this._okAction, ...arguments);
    }
    cancel() {
        return handleBtn.call(this, this._cancelAction, ...arguments);
    }

    action(opt) {
        this._actions = [opt, ...this._actions];
        return this;
    }
    prompt(config = DEFAULT_PROMPT_CONFIG) {
        const input = document.createElement(config.multline ? 'textarea' : 'input');
        input.setAttribute('autofocus', 'autofocus');
        input.className = 'mx__input';
        input.value = config.value || '';
        if (config.multline) {
            input.setAttribute('rows', config.rows || DEFAULT_PROMPT_CONFIG.rows);
        } else {
            input.setAttribute('type', config.type || DEFAULT_PROMPT_CONFIG.type);
        }
        input.setAttribute('placeholder', config.placeholder || DEFAULT_PROMPT_CONFIG.placeholder);
        this._content = input.outerHTML;
        this._inputEl = input;
        return this;
    }

    loading(ms = 0, text = defaults.loadingText) {
        this._esc = false;
        this._shadow = false;
        this._loading = { ms, text };
        ms && setTimeout(() => {
            this.close();
        }, ms);
        return this;
    }
    toast(msg, ms = 3000) {
        this._esc = false;
        this._shadow = false;
        this._toast = msg;
        ms && setTimeout(() => {
            this.close();
        }, ms || defaults.toastTime);
        return this;

    }
    close() {
        this._el.classList.add('mx--hide');
        return this;
    }
    show(closeOther) {
        this._container.appendChild(this._el);
        return this;
    }
}




