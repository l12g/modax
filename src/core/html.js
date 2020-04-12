
const html = `
<div class='mx' _style='{width}'>
    <div class='mx__title' _text='title' _visible='!!title'></div>
    <div class='mx__body'>
        <div class='mx__content'>
            <div class='mx__content-icon' _visible='!!icon' _style='{color:iconColor}' _text='icon'></div>
            <div class='mx__content-raw' _visible='!!content' _text='content'></div>
            <input class='mx__input' _visible='!!prompt' autofocus='autofocus' on-input='onInputChange'/>
        </div>
    </div>
    <div class='mx__footer'>
        <div class='mx__btn' 
        on-click='item.click'
        _each='item of actions' 
        _visible='item.visible'
        _class='["mx__btn--"+item.type,item.loading?"disabled":""]' 
        _key='item.key'>
            <div class='mx-loading' _visible='!!item.loading'><span/></div>
            <span _text='item.text'></span>
        </div>
    </div>
</div>
`
export default html;