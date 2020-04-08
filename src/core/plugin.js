import { isFunction, isString } from "./utils";
import Modalx from './instance';
import promptPlugin from '../plugins/prompt';
import * as loadingPlugin from '../plugins/loading';
import * as toastPlugin from '../plugins/toast';
import { parse } from '../core/node';
import { loading } from '../core/html';


const installedPlugins = Modalx.prototype.plugins = {};
export default function addPlugin(pluginName, plugin, pluginOpt = {}) {
    if (installedPlugins[pluginName]) {
        console.warn(`plugin ${pluginName} has been installed!`)
        return;
    }
    if (!plugin) {
        console.warn(`invalid plugin`);
        return
    }
    const { template, data, container } = pluginOpt;

    Modalx.prototype[pluginName] = function() {
        if (data) {
            this._data = data;
        }
        if (template) {
            this._node = parse(template);
        }
        if (container) {
            const el = isString(container) ? document.querySelector(container) : container;
            if (el) {
                this._container = el;
            }
        }
        plugin.apply(this, arguments);
        return this;
    }
}

addPlugin('prompt', promptPlugin);
addPlugin('loading', loadingPlugin.plugin, {
    template: loadingPlugin.template,
});
addPlugin('toast', toastPlugin.plugin, {
    template: toastPlugin.template
});