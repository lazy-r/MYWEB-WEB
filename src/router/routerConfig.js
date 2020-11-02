// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容

import {mainConfig} from '../pages/main'
import {dicConfig} from '../pages/dic'
import NotFind from "../pages/notFind/NotFind";
const baseConfig = [
    {
        path:"*",
        component: NotFind
    }
];


const routerConfig = [
    ...mainConfig,
    ...dicConfig,
    ...baseConfig
];

export default routerConfig;
