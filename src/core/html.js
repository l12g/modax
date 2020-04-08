const html = `
<div class='mx' data-style='{width}'>
    <div class='mx__title' data-text='title' data-visible='!!title'></div>
    <div class='mx__body'>
        <div class='mx__content'>
            <div data-visible='!!content' data-text='content'></div>
            <input class='mx__input' data-visible='!!prompt' autofocus='autofocus' on-input='onInputChange'/>
        </div>
    </div>
    <div class='mx__footer'>
        <div class='mx__btn' 
        on-click='item.click'
        data-each='item of actions' 
        data-visible='item.visible'
        data-classes='["mx__btn--"+item.type,item.loading?"disabled":""]' 
        data-key='item.key'>
            <div class='mx__loading' data-visible='!!item.loading'><span/></div>
            <span data-text='item.text'></span>
        </div>
    </div>
</div>
`
export default html;