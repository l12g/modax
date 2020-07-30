import addPlugin from "../core/plugin";
function fillPool() {
  this._pool = this._pool || new Map();
}
function onPlugin(type, fn) {
  fillPool.call(this);
  this._pool.set(type, this._pool.get(type) || new Set());
  this._pool.get(type).add(fn);
}
function offPlugin(type, fn) {
  fillPool.call(this);

  const set = this._pool.get(type);
  if (!set) {
    return;
  }
  fn ? set.delete(fn) : set.clear();
}
function emitPlugin(type, data) {
  fillPool.call(this);
  const set = this._pool.get(type);
  if (set) {
    for (const fn of set.values()) {
      fn.call(this, data);
    }
  }
}
addPlugin("on", onPlugin);
addPlugin("off", offPlugin);
addPlugin("emit", emitPlugin);
