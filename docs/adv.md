## 自定义按钮

使用 `.action` 定义弹窗底部的操作按钮，默认包含 `确认` 和 `取消` 两个按钮

该方法支持传入一个配置对象，支持下列属性：

- `text` 按钮文字
- `type` 按钮类型，支持 `ok` `cancel` `danger` `default` 四种类型
- `click` 点击回调，返回 `true` 可以关闭当前弹层

?> 注意，添加的按钮位于首部

```js
mdx()
  .action({
    text: "我知道了",
    type: "ok",
    click: () => {
      // doSth();
      return true;
    },
  })
  .show();
```

<a href='javascript:; ' onclick="mdx().content('自定义按钮').action({text:'我知道了', type:'ok'}).show()">试一试</a>

使用 `.ok` 和 `.cancel` 方法可以自定义或隐藏默认的操作按钮

```js
mdx()
  .ok("知道了", () => {
    return true;
  })
  .cancel("不再提示", () => {
    return true;
  })
  .show();

// 传入false可以隐藏按钮
mdx.ok(false).cancel(false).show();
```

<a href='javascript:; ' onclick="mdx().content('自定义默认按钮').ok('我知道了').cancel(false).show()">试一试</a>

## 异步关闭

如果 `click` 回调返回一个 `Promise` ， `mdx` 会认为该操作是异步的，将自动显示加载按钮

一旦 `Promise` 完成，除非显式的返回 `false` ，否则该弹层会自动关闭

```js
// 1s后自动关闭
mdx().ok(() => {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
});

// 不会自动关闭
mdx().ok(() => {
  return new Promise((res) => {
    setTimeout(() => res(false), 1000);
  });
});
```

<a href='javascript:; ' onclick="demo.asyncModal()">试一试</a>

## 显示图标

使用`.icon`方法定义弹层的图标和图标颜色

```js
mdx().icon("alert").content("图标").show();
```

<a href='javascript:; ' onclick="mdx().icon('alert').content('图标').show()">试一试</a>

## 输入框

使用 `.prompt` 可以让弹层显示输入框，该方法接受一个 g 配置参数，[查看详情](api?id=actionopt-object)：

- `placeholder` 占位符
- `multline` 是否支持多行输入
- `type` 同 `input` 的 `type`
- `rows` 同 `textarea` 的 `rows`
- `value` 输入框默认值

调用该方法后，所有按钮的 `click` 回调接受输入的值作为第一个参数

```js
mdx()
  .prompt({
    placeholder: "请输入",
  })
  .ok((value) => {
    console.log(value);
  })
  .show();
```

<a href='javascript:; ' onclick="demo.prompt()">试一试</a>

## Loading

使用 `.loading` 显示一个加载层，该方法可接受两个参数

- `ms` 持续时间，单位毫秒，为 0 表示不关闭
- `text` 文本

```js
// 1s后关闭
mdx().loading(1000).title("I WILL BE BACK...").show();
```

<a href='javascript:; ' onclick="mdx().loading(1000).title('I WILL BE BACK... ').shadowType('light').show()">试一试</a>

## Toast

使用 `.toast` 显示一个加载层，该方法接受两个参数

- `text` 消息内容
- `ms` 持续时间，单位毫秒，为 0 表示不关闭，默认 3000

可以使用 `.action` 方法为消息添加一些额外操作

```js
mdx().toast("I WILL BE BACK...").show();
// 添加额外操作
mdx()
  .toast("I WILL BE BACK...")
  .action({
    text: "撤销",
    click: () => {
      alert("clicked");
    },
  })
  .show();
```

<a href='javascript:; ' onclick="mdx().toast('I WILL BE BACK... ',100000).action({text:'撤销',click:()=>alert('clicked')}).show()">试一试</a>

## 回调

可以使用`.on/.off`注册/取消回调

回调函数的 this 指向当前实例（箭头函数除外），因此你可以继续调用实例上的方法

`mdx`默认有 2 个事件：

- `show` 实例显示时触发
- `close` 实例关闭时触发

```js
mdx
  .on("show", function () {
    // do sth
  })
  .on("close", function () {
    // do sth
  });

// 取消fn回调
mdx.off("show", fn);
// 取消所有show事件的回调
mdx.off("show");
```
