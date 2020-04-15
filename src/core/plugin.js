/**
 * plugin for modalx
 */

import { isString, isFunction } from "./utils";
import { parse } from '../core/node';
import Modalx from './instance';


const installedPlugins = {};
export default function addPlugin(pluginName, plugin, pluginOpt = {}) {
    if (installedPlugins[pluginName]) {
        console.error(`plugin [${pluginName}] has been installed!`)
        return;
    }
    installedPlugins[pluginName] = true;
    const { template, data, container } = pluginOpt || {};

    Modalx.prototype[pluginName] = function pluginEntry() {
        this._data = data || this._data;
        this._node = template ? parse(template) : this._node;
        if (container) {
            const el = isString(container) ? document.querySelector(container) : container;
            this._container = el || this._container;
        }
        isFunction(plugin) && plugin.apply(this, arguments);
        return this;
    }
}
