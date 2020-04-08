## 安装

``` bash
npm i @oklxq/modal-x
```

或者

``` bash
yarn add @oklxq/modal-x
```

## 使用

`Modalx` 会添加一个名为 `modalx` 的全局函数，该函数返回一个`Modalx`实例

实例上所有的方法支持链式调用

必须在最后调用`show`方法，否则不会显示

``` js
modalx().show();
// 关闭某个弹层
modalx.close(id);
// 一些默认参数
modalx.defaults;
```

