<template>
  <div class="login-wrapper">
    <div class="login-top">
      <img src="~assets/images/img-logo.png"/>
      <span class="textSpan"> 世界的东方，一流的电气</span>
    </div>
    <div class="login-from" v-if="isRegister">
      <div class="login-wrap">
        <h1 class="login-title">平台登录</h1>
        <span class="small-title">东方电气，让企业更有洞察力!</span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户名密码登录" name="first">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="form"
              label-width="80px"
              hide-required-asterisk
            >
              <el-form-item label="用户名" prop="phone">
                <el-input
                  v-model="loginForm.phone"
                  type="text"
                  auto-complete="off"
                  placeholder="请输入用户名"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="密码" prop="pwd">
                <el-input
                  v-model="loginForm.pwd"
                  type="password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="handleLogin"
                >
                </el-input>
              </el-form-item>
              <!--                  <el-form-item prop="code" label="验证码">-->
              <!--                    <div class="code">-->
              <!--                      <el-input-->
              <!--                        v-model="loginForm.code"-->
              <!--                        auto-complete="off"-->
              <!--                        placeholder="验证码"-->
              <!--                        @keyup.enter.native="handleLogin"-->
              <!--                      >-->
              <!--                      </el-input>-->
              <!--                      <div class="login-code" @click="getCode">-->

              <!--                        <img :src="codeUrl" />-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                  </el-form-item>-->
              <el-form-item>
                <el-button
                  class="login-btn"
                  :loading="loading"
                  type="primary"
                  @click.native.prevent="handleLogin"
                >
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
                <p class="forgetPwd" @click="handleFindPassword">忘记密码</p>
              </el-form-item>
            </el-form>


          </el-tab-pane>
          <!--          <el-tab-pane label="手机验证码登录" name="second">-->
          <!--            <el-form-->
          <!--              ref="phoneForm"-->
          <!--              :model="phoneLogin"-->
          <!--              :rules="phoneLoginRules"-->
          <!--              class="form phoneForm"-->
          <!--              label-width="80px"-->
          <!--              hide-required-asterisk-->
          <!--            >-->
          <!--              <el-form-item label="手机号码" prop="phone">-->
          <!--                <el-input-->
          <!--                  v-model="phoneLogin.phone"-->
          <!--                  type="number"-->
          <!--                  auto-complete="off"-->
          <!--                  placeholder="请输入手机号码"-->
          <!--                >-->
          <!--                </el-input>-->
          <!--              </el-form-item>-->

          <!--              <el-form-item prop="code" label="验证码">-->
          <!--                <div class="code">-->
          <!--                  <el-input-->
          <!--                    v-model="phoneLogin.code"-->
          <!--                    auto-complete="off"-->
          <!--                    placeholder="验证码"-->
          <!--                    class="codeBtn"-->
          <!--                    type="number"-->
          <!--                    @keyup.enter.native="handleLoginByphone"-->
          <!--                  >-->
          <!--                  </el-input>-->
          <!--                  <div class="login-code-two">-->
          <!--                    <el-button type="primary" @click="handleGetCodeNum" v-show="showBtn" :disabled="showDisabled"-->
          <!--                               class="sendBtn">发送验证码-->
          <!--                    </el-button>-->
          <!--                    <el-button type="primary" class="secondBtn" v-show="!showBtn">{{ secondNum }}秒</el-button>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </el-form-item>-->
          <!--              <el-form-item style="margin-top:84px">-->
          <!--                <el-button-->
          <!--                  class="login-btn"-->
          <!--                  :loading="loading"-->
          <!--                  type="primary"-->
          <!--                  @click.native.prevent="handleLoginByphone"-->
          <!--                >-->
          <!--                  <span v-if="!loading">登 录</span>-->
          <!--                  <span v-else>登 录 中...</span>-->
          <!--                </el-button>-->
          <!--              </el-form-item>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
        </el-tabs>
        <div class="notRegisterBox">
          <span>还没有账号？</span><span @click="handleRegister">快速注册</span>
        </div>
      </div>
    </div>

    <div class="login-from" v-if="!isRegister">
      <div class="login-wrap">
        <h1 class="login-title">平台注册</h1>
        <span class="small-title">东方电气，让企业更有洞察力!</span>
        <el-form ref="registerForm"
                 :model="registerForm"
                 :rules="registerRules"
                 class="form1"
                 label-width="80px"
                 hide-required-asterisk>
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="nickname">
            <el-input
              v-model="registerForm.nickname"
              type="text"
              auto-complete="off"
              placeholder="请输入姓名"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
              type="text"
              auto-complete="off"
              placeholder="请输入邮箱"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              auto-complete="off"
              show-password
              placeholder="8-20位由数字、大小写字母、特殊字符组成"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              show-password
              auto-complete="off"
              placeholder="确认密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="registerForm.phone"
                      type="number"
                      onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
                      oninput="if(value.length>11)value=value.slice(0,11)"
                      autocomplete="off"
                      placeholder="11位手机号">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="registerBtn">
              <el-button type="primary" @click="registerBtn">注册</el-button>
              <span @click="handleRegister">使用已有的账户登录</span>
            </div>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <p>东方电气集团有限公司&nbsp; &nbsp;&nbsp;V1.0.0</p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "Login",
  head() {
    return {
      title: this.title,
      meta: [
        {hid: "description", name: "register", content: "东方电气登录界面"},
        {hid: "keywords", name: "register", content: "东方电气,登录,欢迎"},
      ],
    };
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        callback(new Error("手机号码不能为空"));
      } else {
        let reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          this.showDisabled = false
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
      callback();
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        const chrnum = /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
        if (!(chrnum.test(value))) {
          callback(new Error('8-20位且必有数字+特殊字符+大小写字母'));
        }
        callback();
      }
    }
    let validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isRegister: true,

      registerForm: {
        username: "",
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      },
      registerRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, message: '用户名是由字母或数字组成的2~24位字符', trigger: 'blur'},
          {max: 24, message: '用户名是由字母或数字组成的2~24位字符', trigger: 'blur'},
          {
            pattern: '^[a-z0-9][a-z0-9]+[a-z0-9]{0,23}$',
            message: '用户名是由字母和数字组成的2-24位字符',
            trigger: 'blur'
          }
        ],
        nickname: [
          {required: true, message: '请输入姓名'},
          {min: 2, message: '用户名称由英文或汉字组成的2~20位字符', trigger: 'blur'},
          {max: 20, message: '用户名称由英文或汉字组成的2~20位字符', trigger: 'blur'},
          {
            pattern: '^[\u4e00-\u9fa5a-zA-Z]+$',
            message: '用户名称由英文或汉字组成的2~20位字符',
            trigger: 'blur'
          }
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'},
        ],
        confirmPassword: [
          {validator: validateConfirmPassword, trigger: 'blur'},
        ],
        phone: [
          {required: true, validator: validatePhone, trigger: 'blur'}

        ],
      },
      showDisabled: true,
      loginForm: {
        phone: "",
        pwd: "",
        code: "",
        uuid: "",
      },
      loginRules: {
        phone: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          // { min: 2, message: '用户名是由字母和数字组成的2~24位字符', trigger: 'blur' },
          // { max: 24, message: '用户名是由字母和数字组成的2~24位字符', trigger: 'blur' },
          // {
          //   pattern: '^[a-z0-9][a-z0-9]+[a-z0-9]{0,23}$',
          //   message: '用户名是由字母和数字组成的2-24位字符',
          //   trigger: 'blur'
          // }
        ],

        pwd: [
          // {validator: validatePassword, trigger: 'blur'},
          { required: true, message: '请输入密码', trigger: 'blur' },
          // ,
          //    { min:6,max: 20, message: '请输6-20个字符的密码', trigger: 'blur' }
        ],
        // code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      phoneLogin: {
        phone: null,
        code: null
      },
      phoneLoginRules: {
        phone: [
          {required: true, validator: validatePhone, trigger: 'blur'}

        ],
        code: [{required: true, trigger: "blur", message: "请输入验证码"},
          {min: 6, max: 6, message: '请输6位数字的验证码', trigger: 'blur'}
        ],
      },
      codeUrl: "",
      loading: false,
      // 验证码开关
      // 注册开关
      register: false,
      redirect: undefined,
      routeName: "",
      activeName: 'first',
      bgUrl: require('~/assets/images/loginBg.png'),
      showBtn: true,
      secondNum: 60,
      timer: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  /**
   * methods: getLoginCod
   * desc : 服务端渲染获取验证码和uuid  , 初始化form表单字段
   */
  // async asyncData({ store, $homeApi }) {
  //   console.log("服务端渲染");
  //   let resData = await $homeApi.article.handleGetLoginCod();
  //   let uuid = resData.uuid;
  //   let codeUrl = "data:image/gif;base64," + resData.img;
  //   let loginForm = {
  //     phone: "18190708776",
  //     pwd: "123456",
  //     code: "",
  //     uuid: uuid,
  //   };
  //   return { codeUrl, loginForm };
  // },
  created
    () {
    // this.getCode();
  }
  ,
  watch: {
    secondNum(val) {
      if (val === 0) {
        this.showBtn = true;
        clearInterval(this.timer)
      }
    }
  }
  ,
  destroyed() {
    clearInterval(this.timer)
  }
  ,
  methods: {

    /**
     * methods: getCode
     * desc : 客户端点击图片获取最新的验证码和uuid
     */
    async getCode() {
      let resData = await this.$homeApi.article.handleGetLoginCodOfCilent();
      this.codeUrl = "data:image/gif;base64," + resData.img;
      this.loginForm.code = "";
      this.loginForm.uuid = resData.uuid;
    }
    ,
    removeAuth() {
      const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {

        for (let i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
          document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
          document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }

        const cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf("=");
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

      }

      window.localStorage.clear()
    },
    /**
     * method: handleLogin
     * desc: 登录接口， 表单字段验证通过后发起登录，
     *       登录成功设置用户信息 和token 跳转到首页去
     */
    handleLogin() {
      let path = this.$route.params.path;
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.removeAuth();
          this.loading = true;
          let dataInfor = await this.$homeApi.article.handleLogin(
            this.loginForm
          );
          console.log(dataInfor,'222')
          if (dataInfor) {
            this.loading = false;
            this.$store.commit("setUserInfor", dataInfor.data);
            this.$store.commit("setToken", dataInfor.data.accessToken);
            Cookies.set("userInfor", JSON.stringify(dataInfor.data));
            Cookies.set("token", dataInfor.data.accessToken);
            // Cookies.set("AUTH_TOKEN", dataInfor.data.accessToken);
            Cookies.set("refreshToken", dataInfor.data.refreshToken);
            Cookies.set("helpActiveIndex", 1);
            Cookies.set("headNavIndex", 1);
            // localStorage.setItem("token", dataInfor.refreshToken);
            // localStorage.setItem('AUTH_TOKEN', dataInfor.data.accessToken)
            // localStorage.setItem('REFRESH_TOKEN', dataInfor.data.refreshToken)
            if (path !== undefined) {
              this.$router.push({path});

            } else {
              this.$router.push({name: "index"});
            }

          } else {
            // this.$message.error('用户名或密码错误')
            this.loading = false;
            // this.getCode();
          }
        }
      });
    }
    ,
    //获取手机验证嘛
    async handleGetCodeNum() {
      let resData = await this.$homeApi.article.handleGetphoneCode({phone: this.phoneLogin.phone});
      console.log(resData);
      this.secondNum = 60;
      if (resData.code === 200) {
        this.timer = setInterval(() => {
          this.showBtn = false;
          if (this.secondNum > 0) {
            this.secondNum--;
          }
        }, 1000);
      }
    }
    ,
    handleLoginByphone() {
      let path = this.$route.params.path;
      this.$refs.phoneForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let dataInfor = await this.$homeApi.article.handleLoginForPhone(this.phoneLogin)
          if (dataInfor) {
            this.loading = false;
            this.$store.commit("setUserInfor", dataInfor.data);
            this.$store.commit("setToken", dataInfor.data.accessToken);
            Cookies.set("userInfor", JSON.stringify(dataInfor.data));
            Cookies.set("token", dataInfor.data.accessToken);
            // Cookies.set("AUTH_TOKEN", dataInfor.data.accessToken);
            // Cookies.set("REFRESH_TOKEN", dataInfor.data.refreshToken);
            Cookies.set("helpActiveIndex", 1);
            Cookies.set("headNavIndex", 1);
            // localStorage.setItem("token", dataInfor.refreshToken);
            localStorage.setItem('AUTH_TOKEN', dataInfor.data.accessToken)
            localStorage.setItem('REFRESH_TOKEN', dataInfor.data.refreshToken)
            if (path !== undefined) {
              this.$router.push({path});
            } else {
              this.$router.push({name: "index"});
            }

          }
        } else {
          console.log('验证未通过');
        }

      })
    }
    ,
    //前往注册页面
    goRegisterPage() {
      this.$router.push({
        name: "register",
      });
      this.routeName = "register";
    }
    ,
    handleFindPassword() {
      this.$router.push({
        name: "findPassword",
      });
      Cookies.set("headNavIndex", 1);
      this.$store.commit("setNavIndex", 1);
    }
    ,
    handleClick(tab, event) {
      if (this.activeName === 'first') {
        this.$refs.phoneForm.clearValidate();
        this.phoneLogin = {
          phone: null,
          code: null
        }
      } else {
        this.$refs.loginForm.clearValidate();
        this.loginForm = {
          phone: "",
          pwd: "",
          code: "",
          uuid: "",
        }
      }
    }
    ,
    handleRegister() {
      this.isRegister = !this.isRegister
      if (this.isRegister) {
        this.registerForm = {
          username: "",
          nickname: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
        }
        this.$refs.registerForm.clearValidate();
      } else {
        this.loginForm = {
          phone: "",
          pwd: "",
        }
        this.$refs.loginForm.clearValidate();
      }
    }
    ,
    async registerBtn() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let res = await this.$homeApi.article.handleRegisterData(this.registerForm);
          console.log(res,'res')
          if (res.code == 200) {
            this.loading = false;
            this.$message.success('注册成功')
            this.handleRegister()
          } else {
            this.loading = false;
            // this.$message.error(res.msg)
          }
        }
      })

    }
  }
  ,
};
</script>

<style lang="scss">
.form1 {
  margin-top: 15px;
}

.form1 .el-form-item {
  margin-bottom: 18px;
}

.registerBtn {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    width: 150px;
  }

  > span {
    font-size: 12px;
    color: #00a972;
    cursor: pointer;
  }
}

.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: url("~/assets/images/login_bg.png") no-repeat;
  background-size: cover;
}

.login-from {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  padding: 50px 88px 0 88px;
  background: #fff;

  .login-wrap {
    width: 424px;
    height: 550px;
    position: relative;

    .notRegisterBox {
      position: absolute;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 100%;

      span:last-child {
        cursor: pointer;
        color: #00a972;
      }
    }
  }

  .login-title {
    height: 36px;
    font-size: 36px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 14px;
  }

  .small-title {
    height: 36px;
    font-size: 18px;
    color: #B3B3B3;
    line-height: 36px;
    margin-bottom: 61px;
  }

  .el-tabs__item {
    font-size: 15px;
  }

  .form {
    margin-top: 38px;

    .login-code {
      display: inline-block;
      width: 34%;
      height: 38px;
      // vertical-align: middle;
      // margin-bottom:3px;
      // margin-left: 5px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }

      .secondBtn {
        background: #00A972;
        color: #fff;
      }
    }

    .login-code-two {
      display: inline-block;
      width: 35.95%;
      height: 38px;
      // vertical-align: middle;
      // margin-bottom:3px;
      // margin-left: -4px;
      // margin-top: -2px;
    }

    .login-btn {
      font-size: 16px;
      width: 100%;
    }

    .forgetPwd {
      font-size: 12px;
      font-weight: 300;
      color: #808080;
      text-align: center;
      cursor: pointer;
    }
  }
}

.login-top {
  margin-top: 50px;
  margin-left: 100px;
  line-height: 32px;
  height: 32px;

  img {
    height: 26px;
    vertical-align: middle;
  }

  .textSpan {
    display: inline-block;
    font-size: 19px;
    color: #fff;
    margin-left: 33px;
    vertical-align: middle;
    margin-bottom: 3px;
  }
}

.login-footer {
  position: fixed;
  bottom: 20px;
  width: 100%;

  p {
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
}

.codeBtn {
  width: 64%;
}

// @media screen and (min-width: 1440px) and (max-width: 1680px){
// .login-from{
//    top:16%;
//   width:380px;
//   height:430px;
//   padding: 20px 40px;
//   .login-title{
//     height: 36px;
//     font-size: 24px;
//     font-weight: 400;
//     margin-bottom: 14px;
//     color: #333333;
//   }
//   .small-title{
//     height: 36px;
//     font-size: 15px;
//     color:#B3B3B3;
//     line-height: 36px;
//     margin-bottom:21px;
//   }
//   .el-tabs__item{
//     font-size:15px;
//   }
//   .form{
//     margin-top:10px;
//     .login-code{
//           display: inline-block;
//           width:33%;
//           height: 40px;
//           vertical-align: middle;
//           margin-bottom:3px;
//           img{
//             width:100%;
//             height:100%;
//           }
//     }
//     .login-btn{
//       font-size:17px;
//     }
//     .forgetPwd{
//       font-size: 12px;
//       font-weight: 300;
//       color: #808080;
//       text-align: center;
//       cursor: pointer;
//     }
//   }
// }
// }
// @media screen and (min-width: 1280px) and (max-width: 1440px){
// .login-from{
//    top:13%;
//   width:340px;
//   height:430px;
//   padding: 20px 40px;
//   .login-title{
//     height: 36px;
//     font-size: 24px;
//     font-weight: 400;
//     margin-bottom: 14px;
//     color: #333333;
//   }
//   .small-title{
//     height: 36px;
//     font-size: 15px;
//     color:#B3B3B3;
//     line-height: 36px;
//     margin-bottom:21px;
//   }
//   .el-tabs__item{
//     font-size:15px;
//   }
//   .form{
//     margin-top:10px;
//     .login-code{
//           display: inline-block;
//           width:33%;
//           height: 40px;
//           vertical-align: middle;
//           margin-bottom:3px;
//           img{
//             width:100%;
//             height:100%;
//           }
//     }
//     .login-btn{
//       font-size:17px;
//     }
//     .forgetPwd{
//       font-size: 12px;
//       font-weight: 300;
//       color: #808080;
//       text-align: center;
//       cursor: pointer;
//     }
//   }
// }
// }
// @media screen and (min-width: 1024px) and (max-width: 1280px){
// .login-from{
//    top:10%;
//   width:340px;
//   height:430px;
//   padding: 20px 40px;
//   .login-title{
//     height: 36px;
//     font-size: 24px;
//     font-weight: 400;
//     margin-bottom: 14px;
//     color: #333333;
//   }
//   .small-title{
//     height: 36px;
//     font-size: 15px;
//     color:#B3B3B3;
//     line-height: 36px;
//     margin-bottom:21px;
//   }
//   .el-tabs__item{
//     font-size:15px;
//   }
//   .form{
//     margin-top:10px;
//     .login-code{
//           display: inline-block;
//           width:33%;
//           height: 40px;
//           vertical-align: middle;
//           margin-bottom:3px;
//           img{
//             width:100%;
//             height:100%;
//           }
//     }
//     .login-btn{
//       font-size:17px;
//     }
//     .forgetPwd{
//       font-size: 12px;
//       font-weight: 300;
//       color: #808080;
//       text-align: center;
//       cursor: pointer;
//     }
//   }
// }
// }

</style>
<style>
.login-code-two .el-button {
  border-radius: 0;
  width: 100%;
  height: 38px;
  vertical-align: bottom;
}

.login-code-two .el-button + .el-button {
  margin-left: 0;
}

.login-wrapper .el-form-item__label {
  color: #999;
  font-size: 16px;
}

.login-wrapper .el-tabs__item {
  color: #808080;
  font-size: 16px;
}

.login-wrapper .el-tabs__item.is-active {
  color: #00A972;
}

@media screen and (min-width: 1440px) and (max-width: 1680px) {
  .form .login-code-two .sendBtn {
    padding: 0 0;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .form .login-code-two .sendBtn {
    padding: 0 0;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
  .form .login-code-two .sendBtn {
    padding: 0 0;
  }
}
</style>

<style lang="scss" scoped>
.code {
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 65%;
    line-height: 38px;
  }

  .login-code {
    width: 34%;
  }

  .login-code-two {
    width: 35%;
    line-height: 38px;

    .el-button {
      vertical-align: baseline;
    }
  }

  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
  // .login-code {
  //   height: 38px;
  // }
}
</style>
