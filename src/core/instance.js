import icon from "../icon";
import "../plugins/cb";
import "../plugins/loading";
import "../plugins/prompt";
import "../plugins/toast";
import initData from "./data";
import defaults from "./defaults";
import initEvent from "./event";
import initNode, { patch } from "./node";
import addPlugin from "./plugin";
import { isBoolean, isFunction, isNumber } from "./utils";
let uid = 0;
function handleBtn(action, ...args) {
  action.visible = true;
  if (args.length === 1) {
    if (isBoolean(args[0])) {
      action.visible = args[0];
    } else {
      action[isFunction(args[0]) ? "handler" : "text"] = args[0];
    }
  }
  if (args.length === 2) {
    if (isFunction(args[0])) {
      throw new Error("invalid parameter");
    }
    action.text = args[0];
    action.handler = args[1];
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
  this.escClose(true);
  this.shadowClose(false);
  this.shadow(defaults.shadow);
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
  this._icon = icon[arguments[0]];
  if (!arguments[1]) {
    this._iconColor = arguments[1];
  }
});
addPlugin("action", function actionPlugin(opt, handler) {
  this._actions = [
    ...this._actions,
    Object.assign(
      { visible: true, id: "action_" + this._actions.length, handler },
      opt
    ),
  ];
});
addPlugin("actionBlocked", function actionBlockedPlugin(val) {
  const footer = this._el.querySelector(".mx__footer");
  footer && footer.classList.add(".mx__footer--block");
});
addPlugin("shadow", function shadowTypePlugin(type) {
  const dic = {
    dark: "dark",
    light: "light",
  };
  if (isBoolean(type) && !type) {
    this._el.className = "mx-overlay";
    return;
  }

  this._shadowType = type;
  this._el.className = `mx-overlay mx-overlay--${dic[type] || defaults.shadow}`;
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
  this._isShow = false;
  this._tid && clearTimeout(this._tid);
  this._el.classList.add("mx--hide");
  return this;
});
addPlugin("show", function showPlugin() {
  this._el.classList.remove("mx--hide");
  this._container.appendChild(this._el);
  initEvent.call(this);
  !this._isShow && patch(this._el, this._node, this._data);
  this._isShow = true;
  setTimeout(() => {
    this.emit("show");
  }, 0);
});
