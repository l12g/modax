const cbs = [
  [
    "change-default",
    function () {
      mdx()
        .title("提示")
        .content("更改默认配置")
        .ok("ok")
        .cancel("cancel")
        .show();
    },
  ],
  [
    "basic-use",
    function () {
      /// [basic-use]
      mdx()
        .title("提示")
        .content("我是一个弹窗！")
        .ok(() => {
          alert("confirmed!");
          return true;
        })
        .cancel(() => {
          alert("cancel!");
          return true;
        })
        .show();
      /// [basic-use]
    },
  ],
  [
    "default-action",
    function () {
      /// [default-action]
      mdx()
        .content("配置默认按钮")
        .ok("知道了", () => {
          return true;
        })
        .cancel("不再提示", () => {
          return true;
        })
        .show();
      /// [default-action]
    },
  ],

  [
    "custom-action",
    function () {
      /// [custom-action]
      mdx()
        .content("添加按钮")
        .action(
          {
            text: "删除",
            type: "danger",
          },
          function () {
            //返回true关闭弹窗
            return true;
          }
        )
        .action({
          text: "按钮",
        })
        .show();
      /// [custom-action]
    },
  ],

  [
    "async-close",
    function () {
      /// [async-close]

      mdx()
        .content("异步关闭")
        .ok(() => {
          return new Promise((res) => {
            setTimeout(res, 1000);
          });
        })
        .show();
      /// [async-close]
    },
  ],

  [
    "prompt",
    function () {
      /// [prompt]
      mdx()
        .prompt({
          placeholder: "请输入",
        })
        .ok((value) => {
          alert(value);
          return true;
        })
        .show();
      /// [prompt]
    },
  ],
  [
    "loading",
    function () {
      /// [loading]
      mdx().loading(1000).title("I WILL BE BACK...").show();
      /// [loading]
    },
  ],
  [
    "toast",
    function () {
      /// [toast]

      mdx().title("I WILL BE BACK...").toast().show();
      /// [toast]
    },
  ],

  [
    "plugin",
    function () {
      mdx.plugin(
        "myPlugin",
        function () {
          setTimeout(() => {
            mdx.close(this._id);
          }, 1000);
        },
        {
          // some config
          template: "<h1>hello world</h1>",
        }
      );
      mdx().myPlugin().show();
    },
  ],
];

document.addEventListener("click", (evt) => {
  console.log(evt.target);
  const find = cbs.find((o) => o[0] === evt.target.id);
  console.log(find);
  find && find[1]();
});
