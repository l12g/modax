import { close } from '../manager';

export function plugin(ms) {
    this.escClose(false);
    this.shadowClose(false);

    ms && (this._tid = setTimeout(() => {
        close(this._id);
    }, ms));
}

export const template = `
<div class='mx-loading-wrapper'>
    <div class='mx-loading'><span/></div>
    <span _visible='title' _text='title'></span>
</div>
`