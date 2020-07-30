import defaults from "../core/defaults";
import addPlugin from "../core/plugin";
import { close } from "../manager";

let toastWrapper;
function addClass() {}

function toastPlugin(ms = defaults.toastTime) {
  this._el.className = "mx-toast";
  this._el.style.cssText = "";
  this.ok(false);
  this.cancel(false);
  if (!toastWrapper) {
    toastWrapper = document.createElement("div");
    toastWrapper.className = "mx-toast-wrap";
    document.body.appendChild(toastWrapper);
  }
  if (defaults.toastAlign === "middle") {
    this.middle();
    this.overlap();
  }
  defaults.toastAlign === "bottom" && this.bottom();

  this._container = toastWrapper;
  ms &&
    (this._tid = setTimeout(() => {
      close(this._id);
    }, ms));
  return this;
}

function middle() {
  if (!toastWrapper) {
    return console.warn("call toast() first!");
  }
  toastWrapper.classList.remove("mx-toast-wrap--bottom");
  toastWrapper.classList.add("mx-toast-wrap--middle");
  this.overlap();
}
function bottom() {
  if (!toastWrapper) {
    return console.warn("call toast() first!");
  }
  toastWrapper.classList.add("mx-toast-wrap--bottom");
  toastWrapper.classList.remove("mx-toast-wrap--middle");
}
function overlap() {
  this._el.classList.add("mx-toast--overlap");
}

const template = `<div class='mx-toast__content'>
    <span _text='title'></span>
    <ul class='mx-toast__btns'>
        <li class='mx-toast__btn' 
        _data-id='item.id'
        _data-disabled='item.disabled||item.loading'
        _each='item of actions' 
        _visible='item.visible'
        _key='item.key'>
        <span class='mx-loading' _visible='!!item.loading'></span>
        <span _text='item.text'></span>
        </li>
    </ul>
</div>
`;
addPlugin("toast", toastPlugin, {
  template,
});
addPlugin("middle", middle);
addPlugin("bottom", bottom);
addPlugin("overlap", overlap);
