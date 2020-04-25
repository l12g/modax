import "./style/style.scss";
import { create, close } from "./manager.js";
import defaults from "./core/defaults";
import addPlugin from "./core/plugin";

export default function modax(id) {
  return create(id);
}
modax.close = function (id) {
  close(id);
};
modax.defaults = defaults;
modax.plugin = addPlugin;
