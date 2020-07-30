## 基础用法

[filename](./js/demo.js ':include :type=code :fragment=basic-use')

<a href='javascript:; ' id='basic-use'>试一试</a>

## 更改默认配置

`Modax.defaults`对象包含了一些默认的配置参数

必须在实例化之前配置才能生效，会作用到之后创建的所有实例

```js
mdx.defaults.okText = "ok";
mdx.defaults.cancelText = "cancel";
```

<a href='javascript:; ' id='change-default'>试一试</a>

## 自定义按钮

`Modax`默认包含 `确认` 和 `取消` 两个操作

使用 `.ok` 和 `.cancel` 方法可以配置默认按钮，[查看文档](api.md#oktext-stringfunctionboolean-cb-function)

[filename](./js/demo.js ':include :type=code :fragment=default-action')

<a href='javascript:; ' id='default-action'>试一试</a>

可以使用 `.action(opt,handler)` 添加额外按钮

opt 接受以下配置：

- `text` 按钮文字
- `type` 按钮类型，支持 `ok` `cancel` `danger` `default` 四种类型
- `visible` 是否可见，默认 true
- `disabled` 是否禁用，默认 false
- `loading` 是否是加载状态，默认 false

[filename](./js/demo.js ':include :type=code :fragment=custom-action')

<a href='javascript:;' id='custom-action'>试一试</a>

## 异步关闭

如果回调返回一个 `Promise` ， Modax 会认为该操作是异步的，将自动显示加载按钮

一旦 `Promise` 完成，除非显式的返回 `false` ，该弹层会自动关闭

[filename](./js/demo.js ':include :type=code :fragment=async-close')

<a href='javascript:; ' id='async-close'>试一试</a>


以下代码则不会关闭弹窗

```js
mdx()
  .content("resolve(false)不会关闭弹窗")
  .ok(() => {
    return new Promise((res) => {
      setTimeout(() => res(false), 1000);
    });
  });
```


## 显示图标

使用`.icon`方法定义弹层的图标和图标颜色

```js
mdx().icon("alert").content("图标").show();
```

<a href='javascript:; ' onclick="mdx().icon('alert').content('图标').show()">试一试</a>

## 输入框

使用 `.prompt` 可以让弹层显示输入框，[查看配置](api?id=actionopt-object)：

调用该方法后，所有按钮的回调接受输入的值作为第一个参数

[filename](./js/demo.js ':include :type=code :fragment=prompt')

<a href='javascript:; ' id='prompt'>试一试</a>

## Loading

使用 `.loading` 显示一个加载层

[filename](./js/demo.js ':include :type=code :fragment=loading')


<a href='javascript:; ' id='loading'>试一试</a>

## Toast

使用 `.toast` 显示一个消息层

[filename](./js/demo.js ':include :type=code :fragment=toast')



<a href='javascript:; ' id='toast'>试一试</a>

## 事件

可以使用`.on/.off`注册/取消事件

事件回调函数的 this 指向当前实例（箭头函数除外），因此你可以继续调用实例上的方法

`mdx`默认有 2 个事件：

- `show` 实例显示时触发
- `close` 实例关闭时触发
- `click` 代理整个实例的click事件

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
// 取消该实例所有的事件回调
mdx.off();
```
