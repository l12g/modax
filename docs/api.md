## 全局

### modalx(id?: String|Number)

* `id` 该弹层唯一标识

创建一个弹层，并返回其实例

``` js
modalx('my modal')
```

### modalx.defaults

弹层的默认值

* `okText` 确定按钮文字，默认 `确定` 
* `cancelText` 取消按钮的文字，默认 `取消` 
* `titleText` 默认的标题文字，默认 `提示` 
* `loadingText` 默认的加载文案，默认 `''` 
* `toastTime` 默认消息时长，默认 `3000` 
* `width` 默认弹层宽度，默认 `400` 

``` js
modalx.defaults.okText = '确定';
modalx.defaults.cancelText = '取消';
```

### modalx.close(id?:string)

* `id` 弹层id

关闭指定的弹层，若不传 `id` ，则关闭所有

``` js
modalx('m1').show();

modalx.close('m1');
// 关闭所有弹层
modalx.close();
```

## 实例方法

### .title(val: String|Boolean)

* `val` 标题

设置弹窗的标题，若传递 `false` 则隐藏标题栏

``` js
modalx().title('title');
modalx().title(false);
```

### .content(val: String)

* `val` 弹层内容

设置弹层显示内容，支持 `html` 字符串

``` js
modalx()
    .title('info')
    .content('hello world')
    .show();

modalx()
    .title('info')
    .content('<h3>some content</h3>')
    .show();
```

### .width(val: String|Number)

* `val` 弹层宽度

设置弹层的宽度

若传入数字，则自动应用 `px` 后缀

``` js
modalx().width(100).show();
modalx().width('50%').show();
```

### .height(val: String|Number)

* `val` 弹层高度

设置弹层的高度，参考 `.width` 

``` js
modalx().height(100).show();
modalx().height('50%').show();
```

### .escClose(val: Boolean)

`val` 支持键盘 `esc` 键关闭

``` js
modalx().escClose(false).show()
```

### .shadowClose(val: Boolean)

`val` 点击遮罩关闭

``` js
modalx().shadowClose(false).show()
```

### .ok(text: String|Function|Boolean, cb?: Function)

* `text` 设置确定按钮的文字
* `cb` 点击按钮的回调

确定按钮的相关配置

回调函数可返回一个 `Promise` ，此时按钮会自动显示 `loading` 状态

当Promise reolve时，弹层会自动关闭

``` js
modalx()
    .ok('我知道了', function() {
        doSth();
    })
    .show();

// 异步回调
modalx()
    .ok(function() {
        retrun new Promise(res => {

        })
    })
    .show();
// 隐藏确定按钮
modalx()
    .ok(false)
    .show();
```

### .cancel(text: String|Function|Boolean, cb?: Function)

* `text` 设置取消按钮的文字
* `cb` 点击按钮的回调

取消按钮的相关配置，用法参考 `.ok` 

### .action(opt: Object)

* `opt.text` 按钮文字
* `opt.type` 按钮类型，支持 `ok`  `cancel`  `danger` 
* `opt.click` 点击回调，返回 `Promise` 可显示加载状态

?> 当按钮类型为`ok`或`cancel`时，若click为空，点击按钮会自动关闭弹层

该方法会在按钮行首部添加一个自定义按钮

``` js
modalx('md')
    .content("自定义按钮")
    .action({
        text: '跳过',
        type: 'cancel',
        click: () => {
            modal.close('md');
        }
    })
    .show()
```



<a href='javascript:; ' onclick='demo.customBtn()'>试一试</a>

### .show(closeOther?: Boolean)

* `closeOther` 是否关闭其他弹层

必须调用此方法来显示弹层

``` js
modalx()
    .title('some title')
    .content('some content')
    .ok(function() {})
    .cancel(function() {})
    .show()
```

### .close()

手动关闭弹层

大多数情况下，可以使用 `modalx.close` 代替此方法

``` js
const modal = modalx().show();
modal.close();
```

### .toast(val: String, ms: Number=3000)

* `val` 消息内容
* `ms` 持续时间，单位毫秒

改变弹层形态，显示一条消息

此时，下列方法无效

* `.ok` 
* `.cancel` 
* `.width` 
* `.title` 
* `.content` 
* `.width` 
* `.height` 

``` js
modalx()
    .toast('hello world')
    .show()
```

<a href='javascript:; ' onclick='modalx().toast("hello world").show()'>试一试</a>

### .loading(ms?,text?:String)

* `ms` 持续时间，0表示不自动关闭
* `text` 文案

改变弹层形态，显示全屏加载图标

此时，下列方法无效

* `.ok` 
* `.cancel` 
* `.width` 
* `.title` 
* `.content` 
* `.width` 
* `.height` 

``` js
modalx()
    .loading(1000,'loading')
    .show()
```

<a href='javascript:; ' onclick='modalx().loading(1000,"loading...").show()'>试一试</a>

