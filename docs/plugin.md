通过插件，可以为 `modalx` 添加更多功能

### 内置插件

`modalx` 内置三个插件

* `prompt` 输入功能
* `loading` 加载功能
* `toast` 显示消息层

可以到 [示例用法](adv) 查看效果

### 注册插件

插件的本质是在 `modalx` 的原型上添加了一个方法

可使用 `modalx.plugin` 注册一个插件，该方法接受三个参数

* `name` 插件名称
* `plugin` 插件逻辑
* `opt` 插件配置

!> 注意，插件必须在实例化之前完成注册

``` js
modalx.plugin('myPlugin', function() {
    // some code
    setTimeout(() => {
        modalx.close(this._id);
    }, 1000);
}, {
    // some config
    template:"<h1>hello world</h1>"
})
```

## 使用插件

插件名称会自动注册为 `modalx` 实例上的一个方法，并支持链式调用

``` js
modalx().myPlugin().show();
```
<a href='javascript:; ' onclick="modalx().myPlugin().show()">试一试</a>

