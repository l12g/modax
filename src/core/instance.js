import { isFunction, isBoolean, isNumber } from './utils';
import { close } from '../manager';
import initNode, { patch } from './node';
import initEvent from './event';
import defaults from './defaults';
import initData from './data';

let uid = 0;


function handleBtn(action, ...args) {
    if (args.length === 1) {
        if (isBoolean(args[0])) {
            action.visible = args[0];
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
    return this;
}

export default class Modalx {
    constructor(id) {
        this.init(id || 'mx-' + uid++);
        this._container = document.body;
    }
    init() {
        const el = this._el = document.createElement('div');
        el.className = 'mx-overlay';
        initData.call(this);
        initNode.call(this);
        initEvent.call(this);
        this._id = this._id || arguments[0];
        this.escClose(true);
        this.shadowClose(false);
        this.shadowType(defaults.shadowType);
    }
    /**
     * 背景颜色 dark | light
     * @param {*} type 
     */
    shadowType(type) {
        if (type !== 'dark' && type !== 'light') {
            return
        }
        this._shadowType = type;
        if (!this._toast) {
            this._el.style.backgroundColor = type === 'dark' ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)';
        }
        return this;
    }

    /**
     * 是否支持键盘ESC键关闭
     * @param {*} val 
     */
    escClose(val) {
        this._escClose = !!val;
        return this;
    }
    /**
     * 是否支持点击背景关闭
     * @param {*} val 
     */
    shadowClose(val) {
        this._shadowClose = !!val;
        return this;
    }
    /**
     * 弹窗标题
     * @param {*} val 
     */
    title(val) {
        this._title = val;
        return this;
    }
    /**
     * 弹窗内容
     * @param {*} val 
     */
    content(val) {
        this._content = val;
        return this;
    }
    /**
     * 弹窗宽度
     * @param {*} size 
     */
    width(size) {
        this._width = isNumber(size) ? (size + 'px') : size;
        return this;
    }
    /**
     * 弹窗高度
     * @param {*} size 
     */
    height(size) {
        this._height = isNumber(size) ? (size + 'px') : size;
        return this;
    }
    /**
     * 确认按钮相关配置
     */
    ok() {
        return handleBtn.call(this, this._okAction, ...arguments);
    }
    /**
     * 取消按钮相关配置
     */
    cancel() {
        return handleBtn.call(this, this._cancelAction, ...arguments);
    }
    /**
     * 添加一个按钮
     * @param {*} opt 
     */
    action(opt) {
        this._actions = [...this._actions, Object.assign({ visible: true }, opt)];
        return this;
    }
    /**
     * 关闭弹窗
     * 移除dom是在动画完成之后
     */
    close() {
        this._tid && clearTimeout(this._tid);
        this._el.classList.add('mx--hide');
        return this;
    }
    /**
     * 显示
     * @param {*} closeOther 
     */
    show(closeOther) {
        this._container.appendChild(this._el);
        setTimeout(() => {
            patch(this._el, this._node, this._data);
        }, 0);
        return this;
    }
}