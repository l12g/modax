## 全局

### mdx(id?: String|Number)

- `id` 该弹层唯一标识

创建一个弹层，并返回其实例

```js
mdx("my modal");
```

### mdx.close(id?:string)

- `id` 弹层 id

关闭指定的弹层，若不传 `id` ，则关闭所有

```js
mdx("m1").show();

mdx.close("m1");
// 关闭所有弹层
mdx.close();
```

### mdx.plugin(name:String,plugin:Function,opt?:Object)

- `name` 插件名称
- `plugin` 插件逻辑
- `opt.template` 插件使用的 html 模板
- `opt.data` 插件相关数据

添加一个插件

### mdx.defaults

弹层的默认值

- `okText` 确定按钮文字，默认 `确定`
- `cancelText` 取消按钮的文字，默认 `取消`
- `titleText` 默认的标题文字，默认 `提示`
- `loadingText` 默认的加载文案，默认 `''`
- `toastTime` 默认消息时长，默认 `3000`
- `width` 默认弹层宽度，默认 `400`
- `shadowColor` 遮罩颜色，默认 `rgba(0,0,0,.5)`

```js
mdx.defaults.okText = "确定";
mdx.defaults.cancelText = "取消";
```

## 实例方法

### .title(val: String|Boolean)

- `val` 标题

设置弹窗的标题，若传递 `false` 则隐藏标题栏

```js
mdx().title("title");
mdx().title(false);
```

### .content(val: String)

- `val` 弹层内容

设置弹层显示内容，支持 `html` 字符串

```js
mdx().title("info").content("hello world").show();

mdx().title("info").content("<h3>some content</h3>").show();
```

### .width(val: String|Number)

- `val` 弹层宽度

设置弹层的宽度

若传入数字，则自动应用 `px` 后缀

```js
mdx().width(100).show();
mdx().width("50%").show();
```

### .height(val: String|Number)

- `val` 弹层高度

设置弹层的高度，参考 `.width`

```js
mdx().height(100).show();
mdx().height("50%").show();
```

### .escClose(val: Boolean)

`val` 支持键盘 `esc` 键关闭

```js
mdx().escClose(false).show();
```

### .shadowClose(val: Boolean)

`val` 点击遮罩关闭

```js
mdx().shadowClose(false).show();
```

### .ok(text: String|Function|Boolean, cb?: Function)

- `text` 设置确定按钮的文字
- `cb` 点击按钮的回调

确定按钮的相关配置

回调函数可返回一个 `Promise` ，此时按钮会自动显示 `loading` 状态

当 Promise reolve 时，弹层会自动关闭

```js
mdx()
    .ok('我知道了', function() {
        doSth();
    })
    .show();

// 异步回调
mdx()
    .ok(function() {
        retrun new Promise(res => {

        })
    })
    .show();
// 隐藏确定按钮
mdx()
    .ok(false)
    .show();
```

### .cancel(text: String|Function|Boolean, cb?: Function)

- `text` 设置取消按钮的文字
- `cb` 点击按钮的回调

取消按钮的相关配置，用法参考 `.ok`

### .action(opt: Object,click?:Function)

- `opt.text` 按钮文字
- `opt.type` 按钮类型，支持 `ok` `cancel` `danger`
- `click` 点击回调，返回 `Promise` 可显示加载状态

?> 当按钮类型为`ok`或`cancel`时，若 click 为空，点击按钮会自动关闭弹层

```js
mdx("md")
  .content("自定义按钮")
  .action(
    {
      text: "跳过",
    },
    function () {
      return true;
    }
  )
  .show();
```

### .show(closeOther?: Boolean)

- `closeOther` 是否关闭其他弹层

必须调用此方法来显示弹层

```js
mdx().title("some title").content("some content").show();
```

### .close()

手动关闭弹层

大多数情况下，可以使用 `mdx.close` 代替此方法

```js
const modal = mdx().show();
modal.close();
```

### .prompt(opt:Object)

- `opt.placeholder` 占位符
- `opt.multline` 是否支持多行输入
- `opt.type` 同 `input` 的 `type`
- `opt.rows` 同 `textarea` 的 `rows`
- `opt.value` 输入框默认值

显示一个输入层

### .toast(ms: Number=3000)

- `ms` 持续时间，单位毫秒，默认3000

改变弹层形态，显示一条消息


```js
mdx().title("hello world").toast().show();
```

### .loading(ms:Number=0)

- `ms` 持续时间，单位毫秒，0 表示不自动关闭

改变弹层形态，显示全屏加载图标

```js
mdx().title("加载中...").loading(1000).show();
```
