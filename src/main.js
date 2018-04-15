import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';
import Moment from 'moment'; // 时间处理插件
import store from './store'; // vuex store
import axios from 'axios';
import './libs/httpaxios.js';
require('expose-loader?$!expose-loader?jQuery!jquery');

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueResource);
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
Vue.prototype.$ajax = axios;

Moment.locale('zh-cn');

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers,
    linkActiveClass: 'is-active', // router-link active样式
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (to.path == '/login.html') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login.html') {
        next({path: '/login.html'})
    } else {
        next()
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

/*new Vue({
 el: '#app',
 template: '<App/>',
 router,
 store,
 components: { App }
 //render: h => h(Login)
 }).$mount('#app')*/
