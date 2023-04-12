<template>
  <div id="consulting">
    <div class="banner-bg"></div>
    <div class="content">
      <h1 class="title-txt">{{ solutionName }}咨询</h1>
      <p class="red-txt">
        本表单将收集您的个人信息，用于进一步沟通；如您不同意提供个人信息，请关闭本表单。
      </p>
      <p class="defalut-txt">
        我们将根据您所填写的信息与您联系，确认使用需求。
      </p>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="elForm"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入您的联系电话" />
        </el-form-item>
        <el-form-item label="企业名称" prop="firmName">
          <el-input
            v-model="form.firmName"
            placeholder="请输入您所在的企业名称"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入您的邮箱" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city" placeholder="请输入您所在的城市" />
        </el-form-item>
        <el-form-item label="咨询内容" prop="content">
          <el-input
            v-model="form.content"
            :rows="6"
            type="textarea"
            placeholder="请输入咨询内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="subBtn" @click="handleSubmit">
            确 认</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "consulting",
  // layout:"BaseLayout",
  data() {
    return {
      solutionName: "",
      form: {
        userName: "",
        phone: "",
        firmName: "",
        email: null,
        city: null,
        content: null,
        solutionId: null,
      },
      rules: {
        userName: [
          { required: true, trigger: "blur", message: "用户姓名不能为空" },
          { max: 20, message: "请输20个字符以内的用户名称", trigger: "blur" },
        ],
        phone: [
          { required: true, trigger: "blur", message: "请输入您的手机号码" },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        city: [{ max: 20, message: "请输20个字符城市名称", trigger: "blur" }],
        firmName: [
          { required: true, trigger: "blur", message: "企业名称不能为空" },
          { max: 50, message: "请输50个字符以内的企业名称", trigger: "blur" },
        ],
        content: [
          { required: true, trigger: "blur", message: "咨询内容不能为空" },
        ],
      },
    };
  },
  created() {
    this.solutionName = this.$route.query.name;
    this.form.solutionId = this.$route.query.id;
  },
  methods: {
    //提交咨询信息
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        console.log(this.form);
        if (valid) {
          console.log("验证通过");
          let res = await this.$homeApi.article.handleSolutionconsult(
            this.form
          );
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message:
                "您的申请已提交成功,我们将尽快联系您，请保持手机通讯正常",
            });
          }
        } else {
          console.log("验证不通过");
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
#consulting {
  width: 700px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 0px 0 50px 0;
  margin: 20px auto 20px auto;
}
.banner-bg {
  margin-top: -2px;
  position: relative;
  color: #fff;
  width: 100%;
  height: 100px;
  background: url("~/assets/images/consultubgBg.png") no-repeat;
  background-size: 100% 100%;
}
.content {
  padding: 0 28px;
  .title-txt {
    font-size: 20px;
    margin-bottom: 8px;
    margin-top: 26px;
  }
  .red-txt {
    color: #ff0606;
    font-size: 12px;
    margin-bottom: 8px;
  }
  .defalut-txt {
    color: #333333;
    margin-bottom: 51px;
  }
  .elForm {
    .subBtn {
      width: 172px;
      font-size: 15px;
    }
  }
}
</style>
<style>
#consulting .el-textarea__inner {
  font-family: Microsoft YaHei !important;
}
#consulting .el-input,
.el-input__inner {
  width: 378px;
  height: 38px;
  background: #f7f7f7;
}
#consulting .el-input__inner:focus {
  border-color: #00a972;
}
#consulting .el-textarea__inner:focus {
  border-color: #00a972;
}
#consulting .el-input__inner {
  border: 1px solid #b3b3b3;
}
#consulting .el-textarea__inner {
  width: 563px;
  height: 162px;
  background: #f7f7f7;
  border: 1px solid #b3b3b3;
}
</style>
