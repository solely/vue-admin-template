<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-header {
        height: 60px;
        background: #3c8dbc;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .layout-logo-left span {
        display: block;
        color: white;
        line-height: 30px;
        text-align: center;
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }

    .layout-header-nav {
        float: right;
        height: 100%; /*padding-right:20px;*/
        color: white;
    }

    .layout-header-nav li {
        float: right;
        line-height: 60px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 13px;
        list-style:none;
    }

    .layout-header-nav li:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .layout-header-nav li img.user-image {
        float: left;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 16px;
    }

    .layout-header-nav ul.user-info {
        position: absolute;
        right: 0;
        left: auto;
        width: 280px;
        top: 61px;
        z-index:1990;
    }

    .layout-header-nav ul.user-info li {
        width: 100%;
    }

    .layout-header-nav ul.user-info li.user-header {
        height: 175px;
        padding: 10px;
        text-align: center;
        background-color: #3c8dbc;
    }

    .layout-header-nav ul.user-info li.user-header .img-circle {
        z-index: 5;
        height: 90px;
        width: 90px;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }

    .layout-header-nav ul.user-info li.user-header p {
        z-index: 5;
        color: rgba(255, 255, 255, 0.8);
        font-size: 17px;
        margin-top: -18px;
        line-height: 30px;
    }

    .layout-header-nav ul.user-info li.user-header p small {
        display: block;
        font-size: 12px;
    }

    .layout-header-nav ul.user-info li.user-footer {
        background-color: #f9f9f9;
        padding: 10px;
    }

    .layout-header-nav ul.user-info li.user-footer .pull-left {
        float: left !important;
    }

    .layout-header-nav ul.user-info li.user-footer .pull-right {
        float: right !important;
    }

    .show {
        display: block;
    }

    .notShow {
        display: none;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" accordion @on-select="menuSelect"
                      :active-name="this.$route.path">
                    <div class="layout-logo-left"><span>xxx管理后台</span></div>

                    <!--<Submenu name="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            统计分析


                        </template>
                        <Menu-group title="使用">
                            <Menu-item name="3-1">新增和启动</Menu-item>
                            <Menu-item name="3-2">活跃分析</Menu-item>
                            <Menu-item name="3-3">时段分析</Menu-item>
                        </Menu-group>
                        <Menu-group title="留存">
                            <Menu-item name="3-4">用户留存</Menu-item>
                            <Menu-item name="3-5">流失用户</Menu-item>
                        </Menu-group>
                    </Submenu>-->

                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <Submenu :name="index" v-if="!item.leaf">
                            <template slot="title">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="">{{item.name}}</span>
                            </template>
                            <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path">
                                    <Icon :type="child.iconCls" :size="iconSize"></Icon>
                                    <span class="">{{child.name}}</span>
                                </Menu-item>
                            </template>
                        </Submenu>
                        <Menu-item :name="item.path" v-else>
                            <Icon :type="item.iconCls" :size="iconSize"></Icon>
                            <span class="">{{item.name}}</span>
                        </Menu-item>
                        <!--<template v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="">{{item.children[0].name}}</span>
                            </Menu-item>
                        </template>-->
                        <!-- <Submenu :name="index" v-if="item.leaf&&item.children.length>0">
                            <template slot="title">
                                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                                    <span class="layout-text">{{item.children[0].name}}</span>
                               <Menu-item :name="item.children[0].path">{{item.children[0].name}}</Menu-item>
                            </template>
                        </Submenu>-->
                    </template>
                </Menu>

            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header" id="lay-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32" color="white"></Icon>
                    </i-button>
                    <ul class="layout-header-nav">
                        <li>
                            <div @click="userInfoToggleClick">

                                <img src="../images/user2-160x160.jpg" alt="User Image" class="user-image">
                                {{ username}}

                            </div>


                            <ul class="user-info" v-show="isShowUserInfo">
                                <li class="user-header"><img src="../images/user2-160x160.jpg"
                                                             alt="User Image"
                                                             class="img-circle">
                                    <p>
                                        {{ username}}


                                        <small>注册日期：2017年4月17日</small>
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <Button>个人资料</Button>
                                    </div>
                                    <div class="pull-right">
                                        <Button @click="logout()">退出登录</Button>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>其它选项</li>
                    </ul>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <template v-for="(item,index) in breadcrumb">
                            <template v-if="index = 0">
                                <Breadcrumb-item v-if="item.isHasLink" :href="item.path">{{item.name}}</Breadcrumb-item>
                                <Breadcrumb-item v-else>{{item.name}}</Breadcrumb-item>
                            </template>
                            <template v-else>
                                <Breadcrumb-item v-if="item.isHasLink" :href="item.path">{{item.name}} <template slot="separator">/</template></Breadcrumb-item>
                                <Breadcrumb-item v-else>{{item.name}}<template slot="separator">/</template></Breadcrumb-item>
                            </template>
                        </template>
                    </Breadcrumb>
                </div>
                <div class="layout-content" :style="contentStyle">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; solely
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    let spanLeft = 0;
    let spanRigth = 0;
    let hiddenSpanLeft = 0;
    let hiddenSpanRight = 0;
    let contentHeight = 0;
    if (screenWidth >= 1920) {

        spanLeft = 3;
        spanRigth = 21;
        hiddenSpanLeft = 2;
        hiddenSpanRight = 22;
        contentHeight = 800;

    } else if (screenWidth >= 1280 && screenWidth < 1920) {
        spanLeft = 4;
        spanRigth = 20;
        hiddenSpanLeft = 3;
        hiddenSpanRight = 21;
        contentHeight = 460;
    } else {
        spanLeft = 5;
        spanRigth = 19;
        hiddenSpanLeft = 4;
        hiddenSpanRight = 20;
        contentHeight = 300;
    }
    export default {
        data () {
            return {
                spanLeft: spanLeft,
                spanRight: spanRigth,
                isShowUserInfo: false,
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === spanLeft ? 14 : 24;
            },
            contentStyle: function () {

                return {
                    'min-height': contentHeight + 'px'
                }
            },
            username(){
                return JSON.parse(sessionStorage.getItem('user'));
            },
            breadcrumb: function () {
                let routerName = this.$route.path;
                if (routerName == '/') {
                    return [{path: '/', name: '首页', isHasLink: false}];
                }
                let routers = this.$router.options.routes;
                for (var item in routers) {
                    if (typeof routers[item].isBreadcrumb === 'undefined' || !routers[item].isBreadcrumb) {
                        if (typeof routers[item].children !== "undefined") {
                            let children = routers[item].children;
                            for (var index in children) {
                                if ((typeof children[index].isBreadcrumb === 'undefined' && children[index].path == routerName) || (typeof children[index].isBreadcrumb !== 'undefined' && !children[index].isBreadcrumb && children[index].path == routerName)) {
                                    return [{path: '/', name: '首页', isHasLink: true}, {
                                        name: routers[item].name,
                                        isHasLink: false,
                                        path:'#',
                                    }, {path: children[index].path, name: children[index].name, isHasLink: false}];
                                }
                            }
                        } else {
                            if (routers[item].path == routerName) {
                                return [{path: '/', name: '首页', isHasLink: true}, {
                                    path: routers[item].path,
                                    name: routers[item].name,
                                    isHasLink: false
                                }];
                            }
                        }
                    }
                }
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === spanLeft) {
                    this.spanLeft = hiddenSpanLeft;
                    this.spanRight = hiddenSpanRight;
                } else {
                    this.spanLeft = spanLeft;
                    this.spanRight = spanRigth;
                }
            },
            userInfoToggleClick(){
                this.isShowUserInfo = !this.isShowUserInfo;
            },
            menuSelect(name){
                this.$router.push({path: name});
            },
            logout(){
                sessionStorage.removeItem('user');
                this.$Message.success('退出系统成功!');
                this.$router.push({path: '/login.html'});
            }
        }
    }
</script>