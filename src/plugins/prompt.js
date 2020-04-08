const DEFAULT_PROMPT_CONFIG = {
    multline: false,
    placeholder: '',
    rows: '6',
    value: "",
    type: 'text',
}
export default function promptPlugin(opt = DEFAULT_PROMPT_CONFIG) {
    this._content = '';
    this._prompt = opt;
    return this;
}