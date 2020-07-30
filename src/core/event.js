import { close, last, remove } from "../manager";
import { isBoolean, isFunction, isPromise } from "./utils";
const key = "__mx-evt";

function handleAction(action) {
  const updateAction = () => {
    this._actions = [...this._actions];
  };
  const { handler, id } = action;
  const isDefaultAction =
    action === this._okAction || action === this._cancelAction;

  if (!isFunction(handler) && isDefaultAction) {
    close(this._id);
    return;
  }
  const res = handler.call(this, this._inputVal);
  if (isPromise(res)) {
    action.loading = true;
    res
      .then((isClose) => {
        action.loading = false;
        isBoolean(isClose) ? isClose && close(this._id) : close(this._id);
        updateAction();
      })
      .finally(() => {
        action.loading = false;
        updateAction();
      });
  } else {
    isBoolean(res)
      ? res && close(this._id)
      : isDefaultAction && close(this._id);
  }
  updateAction();
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
    this.emit("click", evt);
    const { classList } = evt.target;
    if (classList.contains("mx-overlay") && this._shadowClose && this._isShow) {
      close(this._id);
      return;
    }
    if (classList.contains("mx__btn") || classList.contains("mx-toast__btn")) {
      const { id } = evt.target.dataset;
      const action = this._actions.find((o) => o.id === id);
      handleAction.call(this, action);
    }
  };
  const handleAniend = (evt) => {
    if (evt.target === this._el) {
      if (!this._isShow) {
        this._el.remove();
        this._isShow = false;
        clearEvents();
        // 如果手动调用instace.close方法，需要将实例从stack中移除
        remove(this);
        this.emit("close");
        this.off() && this._pool.clear();
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
