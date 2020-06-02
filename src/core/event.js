import { isFunction, isPromise, isBoolean, isString, isUnDef } from "./utils";
import { close, last, remove } from "../manager";
const key = "__mx-evt";

function handleAction({ _index, _onclick }) {
  if (!isFunction(_onclick)) {
    return;
  }
  let action = isUnDef(_index) ? null : this._actions[_index];
  const res = _onclick.call(this, this._inputVal);
  if (isPromise(res)) {
    if (action) {
      action.loading = true;
    }
    res.then(
      (isClose) => {
        isBoolean(isClose) ? isClose && close(this._id) : close(this._id);
      },
      () => {
        if (action) {
          action.loading = false;
        }
      }
    );
  } else {
    isBoolean(res) && res && close(this._id);
  }
  this._actions = [...this._actions];
}

document.addEventListener("keydown", (evt) => {
  const modal = last();
  evt.keyCode === 27 &&
    modal &&
    modal._escClose &&
    modal._isShow &&
    close(modal._id);
});

export default function initEvent() {
  const { _el } = this;
  if (this[key]) {
    return;
  }
  const handleClick = (evt) => {
    evt.stopPropagation();
    if (
      evt.target.className === "mx-overlay" &&
      this._shadowClose &&
      this._isShow
    ) {
      close(this._id);
      return;
    }
    handleAction.call(this, evt.target);
  };
  const handleAniend = (evt) => {
    console.log(evt.target);
    if (evt.target === this._el) {
      if (!this._isShow) {
        this._el.remove();
        this._isShow = false;
        clearEvents();
        // 如果手动调用instace.close方法，需要将实例从stack中移除
        remove(this);
        this.emit("close");
      }
    }
  };
  const clearEvents = () => {
    _el.removeEventListener("animationend", handleAniend);
    _el.removeEventListener("click", handleClick);
    delete this[key];
  };
  _el.addEventListener("animationend", handleAniend);
  _el.addEventListener("click", handleClick);
  Object.defineProperty(this, key, {
    value: true,
    configurable: true,
  });
}
