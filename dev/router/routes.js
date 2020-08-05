import ChangeLog from '../pages/changelog.vue'
import Installation from '../pages/installation.vue'
import Quickstart from '../pages/quickstart.vue'

// 公共文件
import publicPage from '../pages/publicpage'

import Button from '../pages/button'

let routes = [
    { path: '/changelog', component: ChangeLog, name: '更新日志' },
    {
        path: '',
        component: publicPage,
        name: '开发指南',
        children: [
            { path: '/installation', component: Installation, name: '安装' },
            { path: '/quickstart', component: Quickstart, name: '快速上手' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Basic',
        children: [
            { path: '/button', component: Button, name: '按钮' },
        ],
    },
]

export default routes;