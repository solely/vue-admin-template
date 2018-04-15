<style scoped>

    .card-box {
        padding: 20px;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin-bottom: 20px;
        background-color: #F9FAFC;
        margin: 180px auto;
        width: 400px;
        border: 2px solid #8492A6;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .formLogin-title {
        text-align: center;
        font-seze: 28px;
    }

    .formLogin-title h3 {
        font-size: 18px;
    }

    .login-no-bottom {
        margin-bottom: 10px;
    }

    #bg {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }

</style>
<template>
    <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
        <img src="../images/bg.jpg" alt="" id="bg">
        <Form-item class="formLogin-title">
            <h3>xx系统登录</h3>
        </Form-item>

        <Form-item prop="username">
            <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </Form-item>
        <Form-item prop="password">
            <i-input size="large" type="password" v-model="formLogin.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
        </Form-item>
        <Form-item class="login-no-bottom">
            <Checkbox-group v-model="formLogin.remember">
                <Checkbox label="记住密码" name="remember"></Checkbox>
            </Checkbox-group>
        </Form-item>
        <Form-item class="login-no-bottom">
            <Row>
                <i-col :xs="{ span: 4, offset: 6 }">
                    <i-button type="primary" @click="handleSubmit('formLogin')"
                    >登录
                    </i-button>
                </i-col>
                <i-col :xs="{ span: 4, offset: 6 }">
                    <i-button type="primary" @click="formLoginReset('formLogin')">
                        重置

                    </i-button>
                </i-col>
            </Row>
        </Form-item>
    </i-form>
</template>
<script>
    export default {
        data () {
            return {
                formLogin: {
                    username: '',
                    password: '',
                    remember: []
                },
                formLoginRules: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'},
                        {type: 'string', message: '账号或密码错误！', trigger: 'blur', pattern: /^root/}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'},
                        {type: 'string', message: '账号或密码错误！', trigger: 'blur', pattern: /^123456$/},
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
                    if (valid) {
                        this.$Message.success('登录成功!');
                        this.$router.push({path: '/'});
                    } else {
                        this.$Message.error('请规范填写表单!');
                    }
                    if (this.formLogin.remember[0] == "记住密码") {
                        sessionStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        sessionStorage.setItem('password', JSON.stringify(this.formLogin.password));
                    } else {
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('password');
                    }
                })
            },
            formLoginReset(name){
                this.$refs[name].resetFields();
            },
        },
        mounted() {
            if (sessionStorage.getItem('username')) {
                this.formLogin.username = JSON.parse(sessionStorage.getItem('username'));
            }
            if (sessionStorage.getItem('password')) {
                this.formLogin.password = JSON.parse(sessionStorage.getItem('password'));
            }
            let self = this;
            document.onkeydown = function (event) {
                let e = event || window.event || arguments.callee.arguments[0];
                if (e && e.keyCode == 13) {
                    self.handleSubmit('formLogin');
                }
            }
        }
    }
</script>
