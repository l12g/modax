import defaults from "../core/defaults";
import { close } from "../manager";
import addPlugin from "../core/plugin";

let toastWrapper;
function addClass() {}

function plugin(text, ms = defaults.toastTime) {
  this._title = text;
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
        on-click='item.click'
        _each='item of actions' 
        _text='item.text' 
        _visible='item.visible'
        _key='item.key'></li>
    </ul>
</div>
`;
addPlugin("toast", plugin, {
  template,
});
addPlugin("middle", middle);
addPlugin("bottom", bottom);
addPlugin("overlap", overlap);
