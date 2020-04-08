import defaults from './defaults';
import { genEachKey } from './utils';
import { patch } from './node';

function proxy(target, source) {
    for (let key in source) {
        Reflect.defineProperty(target, '_' + key, {
            get() {
                return source[key];
            },
            set(val) {
                source[key] = val;
            }
        })
    }
}

function reactive(data, key, value) {
    const ins = this;
    Reflect.defineProperty(data, key, {
        configurable: true,
        get() {
            return value;
        },
        set(val) {
            if (val === value) {
                return;
            }
            value = val;
            const { _isShow, _el, _data, _node } = ins;
            _isShow && patch(_el, _node, _data);
        }
    })
}


const closeHandler = () => true;
export default function initData() {
    const ins = this;
    const okAction = { text: '确定', type: 'ok', click: closeHandler, key: genEachKey(), visible: true };
    const cancelAction = { text: '取消', type: 'cancel', click: closeHandler, key: genEachKey(), visible: true };
    const data = this._data = {
        title: defaults.titleText,
        content: '',
        okAction,
        cancelAction,
        prompt: null,
        width: defaults.width,
        height: defaults.height,
        actions: [
            okAction,
            cancelAction
        ],
        handlers: {
            onInputChange(evt) {
                ins._inputVal = evt.target.value;
            }
        }
    }
    for (let k in data) {
        reactive.call(this, data, k, data[k]);
    }
    proxy(this, data);
    return data;
}