import addPlugin from "../core/plugin";

const DEFAULT_PROMPT_CONFIG = {
  multline: false,
  placeholder: "",
  rows: "6",
  value: "",
  type: "text",
};
function promptPlugin(opt = DEFAULT_PROMPT_CONFIG) {
  this._content = "";
  this._prompt = opt;
  this.on("show", () => {
    this._inputVal = (opt.value + "").length > 0 ? opt.value : "";
    const input = this._el.querySelector("input,textarea");
    if (input) {
      input.focus();
      input.value = this._inputVal || "";
      input.oninput = () => {
        this._inputVal = input.value;
      };
    }
  });
  return this;
}
// adv plugins
addPlugin("prompt", promptPlugin);
