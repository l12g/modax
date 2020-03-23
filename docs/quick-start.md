## 安装

``` bash
npm i @oklxq/modal-x
```

或者

``` bash
yarn add @oklxq/modal-x
```

## 使用

`Modalx` 会添加一个名为 `modalx` 的全局函数

``` js
modalx().show();
// 关闭某个弹层
modalx.close(id);
// 一些默认参数
modalx.defaults;
```

## 功能

`Modalx` 支持三种类型的弹层

* `Modal` 弹窗
* `Toast` 消息 
* `Loading` 加载状态

##### Modal 弹窗

基本的弹窗功能

``` js
modalx().content('hello world').show();
```

<a href='javascript:; ' onclick="modalx().content('hello word').show()">试一试</a>

##### Toast 消息

通过 `toast` 方法在屏幕上显示一条消息

``` js
modalx().toast('hello').show();
```

<a href='javascript:; ' onclick="modalx().toast('hello').show()">试一试</a>

##### Loading 加载中

通过 `loading` 方法显示全屏加载状态

``` js
modalx().loading(1000).show();
```

<a href='javascript:; ' onclick="modalx().loading(1000).show()">试一试</a>

