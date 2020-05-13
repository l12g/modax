import { close } from "../manager";
import addPlugin from "../core/plugin";

function plugin(ms) {
  this.escClose(false);
  this.shadowClose(false);
  ms &&
    (this._tid = setTimeout(() => {
      close(this._id);
    }, ms));
}

const template = `
<div class='mx-loading-wrapper'>
    <div class='mx-loading'><span/></div>
    <span _visible='title' _text='title'></span>
</div>
`;

addPlugin("loading", plugin, {
  template,
});
