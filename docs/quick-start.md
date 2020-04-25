## 安装

``` bash
npm i modax
```

或者

``` bash
yarn add modax
```

## 使用

`modax` 会添加一个名为 `mdx` 的全局函数，该函数返回一个`modax`实例

实例上所有的方法支持链式调用

但必须在最后调用`show`方法，否则不会显示

``` js
mdx().show();
// 关闭某个弹层
mdx.close(id);
// 一些默认参数
mdx.defaults;
```

