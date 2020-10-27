import { createBrowserHistory } from "history";

// createHashHistory hash模式
// createBrowserHistory   history模式
// ......

let history = createBrowserHistory();

export default history;

/**
 * 1. history 可以选择一个模式，然后在根路径中导入  import { Router } from 'react-router-dom'
 * 2. 对 Router 绑定 history 属性，值定义成上面的模式之一
 * 3. 如果我们在其他地方想跳转路由， 可以使用 props.history.push 跳转， 也可以直接使用这里的 history 进行 history.push 跳转
 */