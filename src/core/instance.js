import addPlugin from "./plugin";
import * as loadingPlugin from "../plugins/loading";
import * as toastPlugin from "../plugins/toast";
import promptPlugin from "../plugins/prompt";
import { isNumber, isBoolean, isFunction } from "./utils";
import defaults from "./defaults";
import initData from "./data";
import initEvent from "./event";
import initNode, { patch } from "./node";
let uid = 0;
function handleBtn(action, ...args) {
  action.visible = true;
  if (args.length === 1) {
    if (isBoolean(args[0])) {
      action.visible = args[0];
    } else {
      action[isFunction(args[0]) ? "click" : "text"] = args[0];
    }
  }
  if (args.length === 2) {
    if (isFunction(args[0])) {
      throw new Error("invalid parameter");
    }
    action.text = args[0];
    action.click = args[1];
  }
  return this;
}
function init() {
  this._container = document.body;
  this._id = this._id || arguments[0];
  const el = (this._el = this._el || document.createElement("div"));
  el.className = "mx-overlay";
  initData.call(this);
  initNode.call(this);
  initEvent.call(this);
  this.escClose(true);
  this.shadowClose(false);
  this.shadowType(defaults.shadowType);
}
export default function Modax(id) {
  init.call(this, id || "mx-" + uid++);
}

addPlugin("title", function titlePlugin() {
  this._title = arguments[0];
});
addPlugin("content", function contentPlugin() {
  this._content = arguments[0];
});
addPlugin("icon", function iconPlugin() {
  this._icon = arguments[0];
  this._iconColor = arguments[1];
});
addPlugin("action", function actionPlugin() {
  this._actions = [arguments[0], ...this._actions];
});
addPlugin("shadowType", function shadowTypePlugin(type) {
  const dic = {
    dark: "rgba(0,0,0,.5)",
    light: "rgba(255,255,255,.5)",
  };
  this._shadowType = type;
  if (!this._toast) {
    this._el.style.backgroundColor = dic[type];
  }
});
addPlugin("escClose", function escClosePlugin() {
  this._escClose = !!arguments[0];
});
addPlugin("shadowClose", function shadowClosePlugin() {
  this._shadowClose = !!arguments[0];
});
addPlugin("ok", function okPlugin() {
  handleBtn.call(this, this._okAction, ...arguments);
});
addPlugin("cancel", function cancelPlugin() {
  handleBtn.call(this, this._cancelAction, ...arguments);
});
addPlugin("width", function widthPlugin(size) {
  this._width = isNumber(size) ? size + "px" : size;
});
addPlugin("height", function heightPlugin(size) {
  this._height = isNumber(size) ? size + "px" : size;
});
addPlugin("close", function closePlugin() {
  this._tid && clearTimeout(this._tid);
  this._el.classList.add("mx--hide");
  return this;
});
addPlugin("show", function showPlugin() {
  this._container.appendChild(this._el);
  Promise.resolve().then(() => {
    patch(this._el, this._node, this._data);
  });
});

// adv plugins
addPlugin("prompt", promptPlugin);
addPlugin("loading", loadingPlugin.plugin, {
  template: loadingPlugin.template,
});
addPlugin("toast", toastPlugin.plugin, {
  template: toastPlugin.template,
});
