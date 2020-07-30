/**
 * plugin for modax
 *
 */

import { parse } from "../core/node";
import Modax from "./instance";
import { isFunction, isString } from "./utils";

const installedPlugins = {};
export default function addPlugin(pluginName, plugin, pluginOpt = {}) {
  if (installedPlugins[pluginName]) {
    console.warn(`plugin-name [${pluginName}] has been used!`);
    return;
  }
  installedPlugins[pluginName] = true;
  const { template, data, container } = pluginOpt || {};

  Modax.prototype[pluginName] = function pluginEntry() {
    this._data = data || this._data;
    this._node = template ? parse(template) : this._node;
    if (container) {
      const el = isString(container)
        ? document.querySelector(container)
        : container;
      this._container = el || this._container;
    }
    isFunction(plugin) && plugin.apply(this, arguments);
    return this;
  };
}
