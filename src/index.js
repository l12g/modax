import './style/style.scss';
import { create, close } from './manager.js';
import defaults from './core/defaults';
import addPlugin from './core/plugin';

export default function modalx(id) {
    return create(id);
}
modalx.close = function(id) {
    close(id);
}
modalx.defaults = defaults;
modalx.plugin = addPlugin;