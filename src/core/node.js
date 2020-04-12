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
    const { each, key } = node.userAttrs;
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
        const _key = key ? callExp(key, _ctx) : i;

        const old = eachNodes[i];
        const newNode = list[i];
        if (!old || _key !== old.key) {
            eachNodes[i] = cloneNode(node);
        }

        _ctx.__proto__ = ctx;
        const clone = eachNodes[i];
        delete clone.userAttrs.each;
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
        const attrNames = el.getAttributeNames();
        const data = {
            tag: el.tagName.toLowerCase(),
            staticClasses: [...el.classList],
            staticText: el.textContent,
            children: [],
            on: {},
            ns: /svg/g.test(el.namespaceURI),
            attrs: attrNames.filter(o => o[0] !== '_').reduce((a, b) => {
                a[b] = el.getAttribute(b);
                return a;
            }, {}),
            userAttrs: attrNames.filter(o => o[0] === '_').reduce((a, b) => {
                a[b.slice(1)] = el.getAttribute(b);
                return a;
            }, {}),
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
    const { _el, _index, tag, staticClasses, on, attrs = {}, userAttrs = {} } = node;
    if (userAttrs.each) {
        patchArr(wrapper, node, ctx, parent);
        return;
    }
    if (isString(userAttrs.visible) && userAttrs.visible && !callExp(userAttrs.visible, ctx)) {
        return;
    }
    const crefn = document[node.ns ? 'createElementNS' : 'createElement'];
    const args = [node.ns ? 'http://www.w3.org/2000/svg' : false, tag].filter(Boolean);
    const el = node._el = _el || crefn.apply(document, args);
    if (!el.parentElement || el.parentElement !== wrapper) {
        wrapper.appendChild(el);
    }
    for (let k in attrs) {
        el.setAttribute(k, attrs[k]);
    }
    const classList = staticClasses.slice();

    for (let k in userAttrs) {
        if (k === 'text') {
            el.innerHTML = callExp(userAttrs[k], ctx);
        }
        if (k === 'class') {
            const r = callExp(userAttrs[k], ctx);
            if (isString(r)) {
                classList.push(...r.split(' '));
            }
            if (isArray(r)) {
                classList.push(...r.filter(Boolean));
            }
        }
        if (k === 'style') {
            const styleObj = callExp(userAttrs[k], ctx);
            for (let k in styleObj) {
                el.style[k] = styleObj[k];
            }
        }
    }
    if (!userAttrs.text) {
        el.innerText = node.staticText.replace(/\s/g, '');
        for (let i = 0, len = node.children.length; i < len; i++) {
            patch(el, node.children[i], ctx, node);
        }
    }
    if (classList.length) {
        el.setAttribute('class', classList.join(' '));
    }


    for (let key in on) {

        const defaultHandler = ctx.handlers[on[key]];
        if (key === 'click') {
            // proxy click event
            el['_on' + key] = defaultHandler || callExp(on[key], ctx);
        } else {
            el['on' + key] = defaultHandler;
        }
    }
    el._index = _index;


}


export default function initNode() {
    this._node = parse(template);
}