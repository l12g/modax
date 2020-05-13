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
  return this;
}
// adv plugins
addPlugin("prompt", promptPlugin);
