import "./style/style.scss";
import { create, close } from "./manager.js";
import defaults from "./core/defaults";
import addPlugin from "./core/plugin";

export default function mdx(id) {
  return create(id);
}
mdx.close = function (id) {
  close(id);
};
mdx.defaults = defaults;
mdx.plugin = addPlugin;
