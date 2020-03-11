# web-router

[![wtfpl badge](https://img.shields.io/github/license/wu-yu-xuan/web-router)](https://github.com/wu-yu-xuan/web-router/blob/master/LICENSE)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wu-yu-xuan/web-router)

运行 `yarn test` 来测试

[react-router](https://github.com/reacttraining/react-router) 的模拟实现, 用作学习交流

## How To Use It

```bash
yarn remove react-router react-router-dom @types/react-router @types/react-router-dom
yarn add https://github.com/wu-yu-xuan/web-router.git
```

把 `react-router` | `react-router-dom` 全局查找替换成 `web-router`

break change: `BrowserRouter` 更名为 `Router`

仅实现了部分常用功能, 如果不能运行, 可以参考本项目的[类型定义](https://github.com/wu-yu-xuan/web-router/blob/master/index.d.ts)迁移至类似功能

或欢迎提出 issue 和 pr!

## Who Is Using It

[blog.mscorlib.top](https://github.com/wu-yu-xuan/blog.mscorlib.top)
