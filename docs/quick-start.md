## 安装

```bash
npm i modax
```

或者

```bash
yarn add modax
```

## 使用

`Modax` 导出的是一个函数，该函数返回一个`Modax`实例，实例上所有的方法支持链式调用

但必须在最后调用`show`方法，否则不会显示

在全局状态下，该函数被命名为`mdx`

```html
<script src="modax.js"></script>

<script>
  mdx().show();
</script>
```

在`webpack`中

```js
import mdx from "modax";

mdx().show();
```

