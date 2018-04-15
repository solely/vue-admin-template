import Moment from 'moment'; // 时间处理插件
import axios from 'axios';
import qs from 'qs';
import config from '../config/config';

global.$fn = {
    // ajax默认api地址,一般为API接口地址
    ajaxhost: APP_MODE == 'dev' ? config.dev.baseUrl : (APP_MODE == 'debug' ? config.debug.baseUrl : config.production.baseUrl),
    // 获取url中的参数，允许默认值的设定
    getparam (name, defaultValue) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        return (!r) ? ((!defaultValue) ? '' : defaultValue) : unescape(r[2])
    },
    moment: Moment,
    init () {
        // 登录或注销后需要清空cache
        store.commit('isAuth', false);
        store.commit('authToken', '');
    },
    // 随机字符串
    getCode (n) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let res = ''
        for (let i = 0; i < n; i++) {
            res += chars[Math.floor(Math.random() * chars.length)]
        }
        return res
    },
    // text2html
    t2h (str) {
        let converter = document.createElement('DIV')
        converter.innerText = str
        let html = converter.innerHTML
        converter = null
        return html
    },
    // cache 机制
    cache: [],
    // 默认3秒数据缓存时间
    exp: 1,
    getCache (url) {
        let json = this.cache[url]
        return (json && (json.exp >= this.timestamp())) ? json.data : null
    },
    setCache (url, data, exp) {
        // 默认300秒,{data,exp}
        this.cache[url] = {data: data, exp: this.timestamp() + ((!exp) ? this.exp : exp)}
        // console.log(this.cache)
    },
    // get方式 不鉴权，可进行数据缓存
    $get (ajaxurl, callback, exp) {
        // callback _self:this,data,ajax
        let url = '';
        if (/https?:\/\/.*/.test(ajaxurl)) {
            url = ajaxurl;
        } else {
            url = this.ajaxhost + ajaxurl;
        }
        APP_MODE == 'dev' && console.info('请求API url：' + url);
        let data = this.getCache(url);
        if (!data) {
            axios.get(url, {
                headers: {
                    'Authorization': 'tshop-admin',
                },
            }).then((response) => {
                callback(response.data, true)
                if (!(exp && exp < 0)) this.setCache(url, response.data, exp)
            }).catch((error) => {
                this.ajaxerr(error);
            });
        } else {
            callback(data, false);
        }
    },
    // post带鉴权，不使用缓存
    $post (ajaxurl, param, callback, _self, exp) {
        let url = '';
        if (/https?:\/\/.*/.test(ajaxurl)) {
            url = ajaxurl;
        } else {
            url = this.ajaxhost + ajaxurl
        }
        axios.post(url, qs.stringify(param), {
            headers: {
                // 加入授权验证算法
                'Authorization': 'xxx-admin',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'form-data',
            },
            /*onUploadProgress:function (progressEvent) {
             console.log('onUpload');
             },
             onDownloadProgress:function (progressEvent) {
             console.log('onDown');
             }*/
        }).then(function (response) {
            callback(response.data);
        }).catch((error) => {
            this.ajaxerr(error);
        });
    },
    // ajax错误处理
    ajaxerr (response) {
        // 此处需配合后端进行自定义的错误设置
        // console.log(response);
        switch (response.status) {
            case 0: // 网络不通
                this.$Modal.warning({
                    title: '提示信息',
                    content: '网络暂时未能连通',
                });
                break;
            case 401: // 未登录
            case 403:
                this.$Modal.warning({
                    title: '提示信息',
                    content: '你无权操作！'
                });
                break;
            case 404:
                this.$Modal.warning({
                    title: '404',
                    content: response.data
                });
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
                this.$Modal.error({
                    title: '服务器错误',
                    content: response.data
                });
                break;
            case 521: // 超时
            case 522: // 错误
                this.init()
                break
            case 523:
                this.$Modal.error({
                    title: '提示信息',
                    content: '当前时间存在较大偏差'
                });
                break
            case 524:
                this.$Modal.error({
                    title: '提示信息',
                    content: '未找到相关数据'
                });
                break
            default:
                // 其它错误，暂不处理
                break
        }
    },
    toast (mode, title) {
        store.commit('toast', {
            id: new Date().getTime(),
            title: (title && title.length) > 0 ? title : '操作完成',
            mode: mode
        });
    },
    // 时间戳
    timestamp () {
        return Math.floor(new Date().getTime() / 1000)
    },
    informatique(data, successCallback, self, errorCallback){
        if (data.status == 0) {
            successCallback();
        } else {
            if (errorCallback !== undefined) {
                errorCallback();
            }else {

                self.$Modal.error({
                    title: '提示',
                    content: data.message,
                    loading: false,
                    onOk: () => {
                        self.$Modal.remove();
                    },
                });
                setTimeout(function () {
                    self.$Modal.remove();
                }, 2000);
            }
        }
    },
    getUrlParams:function (param) {
        let url = window.location.search;
        if (/.*\?.*/.test(url)) {

            let urlParams = decodeURI(url.substr(url.indexOf('?')+1)).split('&');
            for (var i = 0; i < urlParams.length; i++) {
                let urlArr = urlParams[i].split('=');

                if (urlArr[0] == param && typeof urlArr[1] !== 'undefined') {
                    return urlArr[1];
                }
            }
        }
        return '';
    },
    //获取元素的（绝对）纵坐标
    getTop:function (obj) {
        let offset = obj.offsetTop;
        if(obj.offsetParent != null) offset += this.getTop(obj.offsetParent);
        return offset;
    },
    //获取元素的（绝对）横坐标
    getLeft:function (obj) {
        let offset = obj.offsetLeft;
        if(obj.offsetParent != null) offset += this.getLeft(obj.offsetParent);
        return offset;
    }
}