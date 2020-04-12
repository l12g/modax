import { isBoolean } from '../core/utils';
import { close } from '../manager';

export function plugin(ms, title) {
    this.escClose(false);
    this.shadowClose(false);
    this.title(title);

    ms && (this._tid = setTimeout(() => {
        close(this._id);
    }, ms));
}

export const template = `
<div class='mx-loading-wrapper'>
    <div class='mx-loading'><span/></div>
    <span data-visible='title' data-text='title'></span>
</div>
`