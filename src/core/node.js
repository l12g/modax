import { isString, isArray } from './utils';
import template from './html';



const NODE_KEY_TYPES = ['object', 'string', 'array', 'boolean', 'number', 'function'];

/**
 * 复制节点
 * @param {*} node 
 */
function cloneNode(node) {
    const cloneFn = val => {
        const type = Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
        if (!NODE_KEY_TYPES.includes(type)) {
            return null;
        }
        if (type === 'object') {
            if (!val) {
                return null;
            }
            const c = {};
            for (let key in val) {
                if (key[0] === '_') {
                    continue;
                }
                c[key] = cloneFn(val[key]);
            }
            return c;
        } else if (type === 'array') {
            return val.map(o => cloneFn(o));
        } else {
            return val;
        }
    }
    const clone = {};
    for (let k in node) {
        if (k[0] === '_') {
            continue;
        }
        clone[k] = cloneFn(node[k]);
    }
    return clone;
}

/**
 * 解析表达式中的变量
 * @param {String} exp 
 */
function parseVal(exp) {
    return exp.replace(/(['"`]).*?\1/g, '')
        .replace(/\.\w+/g, '')
        .match(/\w+/g);
}
/**
 * 执行表达式
 * @param {*} exp 表达式
 * @param {*} ctx 上下文
 */
function callExp(exp, ctx) {
    const vals = parseVal(exp);

    if (!vals) {
        return Function.prototype;
    }
    const arr = Array.from(new Set(vals));
    const dec = arr.map(o => {
        return `const {${o}} = ctx`;
    }).join(';');

    const fn = new Function('ctx', `${dec};return ${exp}`);
    return fn.call(null, ctx);
}


function patchArr(wrapper, node, ctx, parent) {
    const { each } = node;
    const vals = each.replace(/\s+/g, ' ').split(/\sof\s/);
    const list = ctx[vals[1]];
    const doms = [];

    // empty wrapper
    let i = list.length;
    const eachNodes = node._eachNodes = node._eachNodes || [];
    eachNodes.length = i;
    eachNodes.forEach(o => {
        o && o._el && o._el.remove();
    });
    while (i--) {
        const item = list[i];
        const _ctx = {
            [vals[0]]: item
        }
        const key = callExp(node.key, _ctx);

        const old = eachNodes[i];
        const newNode = list[i];
        if (!old || key !== old.key) {
            eachNodes[i] = cloneNode(node);
        }

        _ctx.__proto__ = ctx;
        const clone = eachNodes[i];
        delete clone.each;
        clone._index = i;
        clone[vals[0]] = item;
        patch(parent._el, clone, _ctx, parent);
    }
}
/**
 * 解析dom字符串为虚拟节点
 * @param {*} domStr 
 */
export function parse(domStr) {
    const div = document.createElement('div');
    div.innerHTML = domStr;
    const root = div.firstElementChild;
    if (!root) {
        return;
    }
    const fn = (el, parentNode = null) => {
        const { dataset } = el;
        const data = {
            tag: el.tagName.toLowerCase(),
            staticClasses: [...el.classList],
            staticText: el.textContent,
            children: [],
            ...dataset,
            on: {},
        };
        const handlers = el.getAttributeNames().filter(o => /^on-/.test(o));
        handlers.forEach(o => {
            data.on[o.replace('on-', '')] = el.getAttribute(o);
        });
        const chs = [...el.children];
        for (let ch of chs) {
            data.children.push(fn(ch, data));
        }
        return data;
    }
    return fn(root);
}

/**
 * 将虚拟节点应用到dom上
 * @param {HTMLElement} wrapper 
 * @param {Object} node 
 * @param {Object} ctx 
 * @param {Object} parent 
 */
export function patch(wrapper, node, ctx, parent) {

    const { _el, _index, tag, text, classes, staticClasses, each, key, on, style } = node;
    if (each) {
        patchArr(wrapper, node, ctx, parent);
        return;
    }
    if (isString(node.visible) && node.visible && !callExp(node.visible, ctx)) {
        return;
    }
    const el = node._el = _el || document.createElement(tag);
    for (let key in on) {
        const defaultHandler = ctx.handlers[on[key]];
        if (key === 'click') {
            el['_on' + key] = defaultHandler || callExp(on[key], ctx);
        } else {
            el['on' + key] = defaultHandler;
        }
    }
    el._index = _index;
    const classList = staticClasses.slice();
    if (classes) {
        const r = callExp(classes, ctx);
        if (isString(r)) {
            classList.push(...r.split(' '));
        }
        if (isArray(r)) {
            classList.push(...r.filter(Boolean));
        }
    }
    if (style) {
        const styleObj = callExp(style, ctx);
        for (let k in styleObj) {
            el.style[k] = styleObj[k];
        }
    }
    el.className = classList.join(' ');
    if (text) {
        el.innerHTML = callExp(text, ctx);
    } else {
        el.innerText = node.staticText.replace(/\s/g, '');
        for (let i = 0, len = node.children.length; i < len; i++) {
            patch(el, node.children[i], ctx, node);
        }
    }
    if (!el.parentElement || el.parentElement !== wrapper) {
        wrapper.appendChild(el);
    }
}


export default function initNode() {
    this._node = parse(template);
}