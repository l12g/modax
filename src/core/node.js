import spinIcon from "../icon/spin.svg";
import template from "./html";
import { isArray, isBoolean, isNumber, isString, isUnDef } from "./utils";
/**
 * clone node
 * @param {*} node
 */
function cloneNode(node) {
  if (isArray(node)) {
    return node.map((o) => cloneNode(o));
  }
  if (
    node === null ||
    node !== node ||
    isString(node) ||
    isNumber(node) ||
    isBoolean(node) ||
    isUnDef(node)
  ) {
    return node;
  }

  const obj = {};
  for (const [k, v] of Object.entries(node)) {
    obj[k] = cloneNode(v);
  }
  return obj;
}

/**
 * parse varibles in expression
 * @param {String} exp
 */
function parseVal(exp) {
  return exp
    .replace(/(['"`]).*?\1/g, "")
    .replace(/\.\w+/g, "")
    .match(/\w+/g);
}
/**
 * parse loop expression
 * @param {*} exp
 */
function parseEachVal(exp) {
  return exp.replace(/\s+/g, " ").split(/\sof\s/);
}
/**
 * run expression
 * @param {*} exp expression
 * @param {*} ctx context
 */
function callExp(exp, ctx) {
  const vals = parseVal(exp);

  if (!vals) {
    return Function.prototype;
  }
  const arr = Array.from(new Set(vals));
  const dec = arr
    .map((o) => {
      return `const {${o}} = ctx`;
    })
    .join(";");

  const fn = new Function("ctx", `${dec};return ${exp}`);
  return fn.call(null, ctx);
}

/**
 * parse html 2 virtual node
 * only first child supported
 * @param {*} domStr
 */
export function parse(domStr) {
  const div = document.createElement("div");
  div.innerHTML = domStr;
  const root = div.firstElementChild;
  if (!root) {
    return;
  }
  const fn = (el) => {
    const attrNames = el.getAttributeNames();
    const data = {
      tag: el.tagName.toLowerCase(),
      text: el.textContent,
      children: [],
      on: {},
      ns: /svg/g.test(el.namespaceURI),
      attrs: attrNames
        .filter((o) => o[0] !== "_")
        .reduce((a, b) => {
          a[b] = el.getAttribute(b);
          return a;
        }, {}),
      userAttrs: attrNames
        .filter((o) => o[0] === "_")
        .reduce((a, b) => {
          a[b.slice(1)] = el.getAttribute(b);
          return a;
        }, {}),
    };
    const handlers = el.getAttributeNames().filter((o) => /^on-/.test(o));
    handlers.forEach((o) => {
      data.on[o.replace("on-", "")] = el.getAttribute(o);
    });
    data.attrs["class"] = [...el.classList];
    for (let ch of el.children) {
      data.children.push(fn(ch, data));
    }
    return data;
  };
  return fn(root);
}
function patchArr(wrapper, node, ctx, parent) {
  const { each, key } = node.userAttrs;
  //
  const vals = parseEachVal(each);
  const list = ctx[vals[1]];

  // empty wrapper
  let i = list.length;
  const eachNodes = (node._eachNodes = node._eachNodes || []);
  eachNodes.length = i;
  eachNodes.forEach((o) => {
    o && o._el && o._el.remove();
  });
  while (i--) {
    const item = list[i];
    const _ctx = {
      [vals[0]]: item,
    };
    const _key = key ? callExp(key, _ctx) : i;

    const old = eachNodes[i];
    if (old) {
      old.key = _key;
    }
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
 * patch virtual node to dom tree
 * @param {HTMLElement} wrapper
 * @param {Object} node
 * @param {Object} ctx
 * @param {Object} parent
 */
export function patch(wrapper, node, ctx, parent) {
  const { _el, _index, tag, on, attrs, userAttrs } = node;
  // patch array
  if (userAttrs.each) {
    patchArr(wrapper, node, ctx, parent);
    return;
  }

  // skip invisible node
  if (
    isString(userAttrs.visible) &&
    userAttrs.visible &&
    !callExp(userAttrs.visible, ctx)
  ) {
    return;
  }
  // svg support
  const crefn = document[node.ns ? "createElementNS" : "createElement"];
  const args = [node.ns ? "http://www.w3.org/2000/svg" : false, tag].filter(
    Boolean
  );
  const el = (node._el = _el || crefn.apply(document, args));

  let classList = [];

  for (const [key, val] of Object.entries(attrs)) {
    if (key === "class") {
      classList = val.slice();
    } else {
      el.setAttribute(key, val);
    }
  }

  for (const [key, val] of Object.entries(userAttrs)) {
    if (key === "text") {
      el.innerHTML = callExp(val, ctx);
    } else if (key === "class") {
      const r = callExp(userAttrs[key], ctx);
      isString(r) && classList.push(...r.split(" "));
      isArray(r) && classList.push(...r.filter(Boolean));
    } else if (key === "style") {
      const styleObj = callExp(userAttrs[key], ctx);
      for (const [k, v] of Object.entries(styleObj)) {
        el.style[k] = v;
      }
    } else if (/^data-/.test(key)) {
      el.setAttribute(key, callExp(userAttrs[key], ctx));
    }
  }
  // patch children if no text defined
  if (!userAttrs.text) {
    // static text
    el.innerText = node.text.replace(/\s/g, "");
    for (let i = 0, len = node.children.length; i < len; i++) {
      patch(el, node.children[i], ctx, node);
    }
  }
  classList.length && el.setAttribute("class", classList.join(" "));
  if (classList.indexOf("mx-loading") >= 0) {
    el.innerHTML = spinIcon;
  }

  el._index = _index;
  if (!el.parentElement || el.parentElement !== wrapper) {
    wrapper.appendChild(el);
  }
}

export default function initNode() {
  this._node = parse(template);
}
