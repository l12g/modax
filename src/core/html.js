const html = `
<div class='mx' _style='{width}'>
    <div class='mx__title' _text='title' _visible='!!title'></div>
    <div class='mx__body'>
        <div class='mx__content'>
            <div class='mx__content-icon' _visible='!!icon &&  !prompt' _style='{color:iconColor}' _text='icon'></div>
            <div class='mx__content-raw' _visible='!!content && !prompt' _text='content'></div>
            <div _visible='!!prompt' class='mx__prompt'>
                <input class='mx__input' _visible='!prompt.multline' autofocus='autofocus'/>
                <textarea class='mx__input' _visible='prompt.multline' autofocus='autofocus' _rows='prompt.rows'></textarea>
            </div>
        </div>
    </div>
    <div class='mx__footer'>
        <div class='mx__btn' 
        _each='item of actions' 
        _visible='item.visible'
        _class='["mx__btn--"+item.type,item.loading||item.disabled?"disabled":""]' 
        _data-id='item.id'
        _key='item.key'>
            <span class='mx-loading' _visible='!!item.loading'></span>
            <span _text='item.text'></span>
        </div>
    </div>
</div>
`;
export default html;
