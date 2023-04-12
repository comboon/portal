<template>
  <div class="login">
    <div class="left-box">
      <h1>HELLO!</h1>
      <div class="big-txt">东方电气</div>
      <div class="big-txt">绿色动力 &nbsp;驱动未来</div>
      <div class="small-txt">
        <i class="el-icon-star-on"></i>
        世界的东方,一流的电气
      </div>
      <div style="margin-top: 133px">
        <img src="~assets/images/img-logo.png" />
      </div>
    </div>
    <div class="form-box">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="login-form"
      >
        <h3 class="title" style="margin-bottom: 25px">注册</h3>

        <div class="label-txt">用户名</div>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            type="text"
            auto-complete="off"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <div class="label-txt">密码</div>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.pwd"
            type="password"
            auto-complete="off"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <div class="label-txt">手机号码</div>
        <el-form-item prop="code">
          <el-input
            v-model="registerForm.phone"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <div class="login-code">发送验证码</div>
        </el-form-item>

        <div class="label-txt">手机号验证码</div>
        <el-form-item prop="code">
          <el-input
            v-model="registerForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btn-group" style="margin-top: 65px">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">确认</span>
            <span v-else>注 册 中...</span>
          </el-button>

          <el-button size="medium">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      register: false,
      redirect: undefined,
      routeName: "",
      registerForm: {
        username: "",
        pwd: "",
        phone: "",
        code: "",
        uuid: "",
      },
      registerRules: {},
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
  created() {},
  methods: {
    handleRegister() {},
  },
};
</script>

<style  lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("~/assets/images/img-denglubj.png");
  background-size: cover;
  .form-box {
    padding: 0 53px 0 47px;
    height: 697px;
    background-color: #fff;
  }
  .left-box {
    width: 567px;
    height: 469px;
    background: linear-gradient(180deg, #474747 0%, #31313b 100%);
    opacity: 0.85;
    padding: 115px 77px;
    h1 {
      font-size: 50px;
      font-weight: bold;
      color: #00a972;
      margin-bottom: 45px;
    }
    .big-txt {
      font-size: 62px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 7px;
    }
    .small-txt {
      color: #00a872;
      font-size: 19px;
    }
  }
}
.title {
  margin: 0px auto 7px auto;
  text-align: left;
  height: 36px;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #09ab76;
  margin-bottom: 20px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 310px;
  padding: 25px 25px 5px 25px;
  margin-top: 58px;
  .default-txt {
    color: #939393;
    margin-bottom: 7px;
    font-size: 17px;
  }
  .forgetPassword {
    text-align: right;
    color: #f4821c;
    cursor: pointer;
    font-size: 14px;
  }
  .last {
    margin-bottom: 17px;
  }
  .green-txt {
    color: #09ab76;
  }
  .label-txt {
    color: #cdcdcd;
    font-size: 16px;
    padding: 4px 0;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .el-form-item {
    margin-bottom: 24px;
  }
  .el-button--medium {
    padding: 8px 45px;
    margin-right: 10px;
  }
  .el-button--primary {
    background-color: #00a972;
    border-color: #00a972;
  }
  .el-button--primary:hover {
    background-color: #5fd1ad;
    border-color: #5fd1ad;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #00a972;
    border-color: #00a972;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #5fd1ad;
  }
  .btn-group {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 35%;
  height: 38px;
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  background: #00a972;
  color: white;
  font-weight: bold;
  text-align: center;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  margin-left: -1px;
  margin-bottom: 1px;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
