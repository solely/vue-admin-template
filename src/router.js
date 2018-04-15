import Home from './views/home.vue';

const routers = [
    {
        path: '/login.html',
        component: (resolve) => require(['./views/login.vue'], resolve),
        hidden: true,
        name: ''
    },
    {
        path: '/404.html',
        component: (resolve) => require(['./views/404.vue'], resolve),
        hidden: true,
        name: ''
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        leaf: true,
        iconCls: 'ios-home'
    },
    {
        path: '/',
        component: Home,
        name: '基础资料',
        iconCls: 'ios-baseball-outline', //图标样式class
        children: [
            {
                path: '/basicData/category.html',
                component: (resolve) => require(['./views/basicData/category.vue'], resolve),
                name: '类目',
                iconCls: 'ios-list-outline'
            },
            {
                path: '/basicData/tag.html',
                component: (resolve) => require(['./views/basicData/tag.vue'], resolve),
                name: '标签',
                iconCls: 'ios-list-outline'
            },
            {
                path: '/basicData/taille.html',
                component: (resolve) => require(['./views/basicData/taille.vue'], resolve),
                name: '尺码',
                iconCls: 'ios-list-outline'
            },
            {
                path: '/basicData/marque.html',
                component: (resolve) => require(['./views/basicData/marque.vue'], resolve),
                name: '品牌',
                iconCls: 'ios-list-outline'
            },
        ],
        title: '基础资料'
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'settings',
        children: [
            {
                path: '/settings/modulesUpdate.html',
                component: (resolve) => require(['./views/settings/modulesUpdate.vue'], resolve),
                name: '模块升级',
                iconCls: 'arrow-up-c'
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404.html'}
    },
];
export default routers;