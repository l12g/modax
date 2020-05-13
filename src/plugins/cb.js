import addPlugin from "../core/plugin";

const pool = new Map();
function onPlugin(type, fn) {
  pool.set(type, pool.get(type) || new Set());
  pool.get(type).add(fn);
}
function offPlugin(type, fn) {
  const set = pool.get(type);
  if (!set) {
    return;
  }
  fn ? set.delete(fn) : set.clear();
}
function emitPlugin(type, data) {
  const set = pool.get(type);
  if (set) {
    for (const fn of set.values()) {
      fn.call(this, data);
    }
  }
}
addPlugin("on", onPlugin);
addPlugin("off", offPlugin);
addPlugin("emit", emitPlugin);
