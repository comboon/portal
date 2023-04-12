<template>
  <div id="user-center">
    <div class="banner-bg">
      <img :src="bannerBg" />
      <div class="txt-box">
        <p class="bigTxt">个人中心</p>
        <p class="smallTxt">
          个人中心提供应用信息管理，基本信息修改和密码修改功能。
        </p>
      </div>

      <div class="banner-footer">
        <ul class="tagList">
          <li :class="{ active: activeTag === 1 }" @click="changeTag(1)">
            基本信息
          </li>
          <li :class="{ active: activeTag === 2 }" @click="changeTag(2)">
            修改密码
          </li>
          <li :class="{ active: activeTag === 3 }" @click="changeTag(3)">
            企业认证
          </li>
        </ul>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="userInfor" v-show="activeTag === 1">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          class="elForm"
          hide-required-asterisk
        >
          <el-form-item label="用户账号">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname" disabled></el-input>
          </el-form-item>
          <!--          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" :maxlength="max"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              @keyup.enter.native="handleSettingUser"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="text-align: center; margin-top: 53px; margin-bottom: 0"
          >
            <el-button class="group-btn-f" @click="exitEdit">取 消</el-button>
            <el-button
              class="group-btn"
              type="primary"
              @click="handleSettingUser"
              >确 认</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="resetPwd" v-show="activeTag === 2">
        <el-form
          ref="editPwd"
          :model="editPwd"
          :rules="editRules"
          label-width="120px"
          class="elForm editForm"
          hide-required-asterisk
        >
          <el-form-item label="原始密码" prop="oldPwd">
            <el-input v-model="editPwd.oldPwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input
              v-model="editPwd.newPwd"
              show-password
              @focus="clearvaliDate(1)"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input
              v-model="editPwd.confirmPwd"
              show-password
              @focus="clearvaliDate(2)"
            ></el-input>
          </el-form-item>

          <el-form-item
            style="text-align: center; margin-top: 53px; margin-bottom: 0"
          >
            <el-button class="group-btn" @click="reset">取 消</el-button>
            <el-button
              class="group-btn"
              type="primary"
              @click="handleEditPassword"
              >确 认</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="resetPwd" v-show="activeTag === 3">
        <div class="context-wrapper" v-if="authData.lastApproveStatus === '2'">
          <div class="item-wrapper">
            <span class="label">租户名称</span>
            <span class="value">{{ authData.tenantName }}</span>
          </div>
          <div class="item-wrapper">
            <span class="label">唯一标识</span>
            <span class="value">{{ authData.tenantCode }}</span>
          </div>
          <div class="item-wrapper">
            <span class="label">营业执照</span>
            <span class="value">暂无</span>
          </div>
          <div class="item-wrapper">
            <span class="label">备注</span>
            <span class="value">{{ authData.comment || "-" }}</span>
          </div>
        </div>
        <div
          class="status-wrapper"
          v-else-if="
            (authData.lastApproveStatus === '0' ||
              authData.lastApproveStatus === '1') &&
            !showAuthForm
          "
        >
          <img
            :src="
              authData.lastApproveStatus === '0' ? failStatus : successStatus
            "
            alt=""
            class="status-img"
          />
          <span class="status-text">{{
            authData.lastApproveStatus === "0" ? "认证失败" : "企业认证中"
          }}</span>
          <span class="info">{{
            authData.lastApproveStatus === "0"
              ? "您提交的企业认证失败，您可以点击下方按钮重新提交。"
              : "您的企业认证已提交，正在认证中"
          }}</span>
          <div v-if="authData.lastApproveStatus === '0'">
            <span class="status-text">审批意见</span>
            <span class="info opinion">{{ authData.opinion }}</span>
          </div>

          <el-button
            v-if="authData.lastApproveStatus === '0'"
            size="small"
            type="primary"
            @click="showAuthForm = true"
            >重新认证</el-button
          >
        </div>
        <el-form
          v-if="showAuthForm || isFirst"
          ref="authForm"
          :model="authForm"
          :rules="authRules"
          label-width="120px"
          class="elForm editForm"
          hide-required-asterisk
        >
          <el-form-item label="租户：" prop="tenantId">
            <el-select
              ref="selectContact"
              v-model.trim="authForm.tenantId"
              placeholder="请选择租户"
              filterable
              clearable
              allow-create
              @change="selectTenant"
            >
              <el-option
                v-for="item in tenantOptions"
                :key="item.id"
                :label="item.tenantName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="唯一标识：" prop="tenantCode">
            <el-input
              v-model="authForm.tenantCode"
              maxlength="63"
              clearable
              placeholder="请输入唯一标识"
              :disabled="disabledCode"
            />
          </el-form-item>
          <el-form-item label="营业执照：" prop="file">
            <el-upload class="upload-demo" action="/" disabled>
              <el-button size="small" disabled icon="el-icon-upload2"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip">
                支持扩展名：.jpeg .jpg .png
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注：" prop="comment">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="80"
              placeholder="请输入备注"
              v-model="authForm.comment"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            style="text-align: center; margin-top: 53px; margin-bottom: 0"
          >
            <el-button class="group-btn" @click="resetAuth">取 消</el-button>
            <el-button class="group-btn" type="primary" @click="commitAuth"
              >确 认</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import cloneDeep from "clone-deep";
export default {
  name: "user-center",
  layout: "BaseLayout",
  data() {
    let validateOldPWd = (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        callback(new Error("原始密码不能为空!"));
      }
      // else if (value.length < 6 || value.length > 20) {
      //   callback(new Error("请输6-20个字符的密码"));
      // }

      callback();
    };
    // let validateNewPWd = (rule, value, callback) => {
    //   if (value === "" || value === null || value === undefined) {
    //     callback(new Error("新密码不能为空!"));
    //   } else if (value.length < 6 || value.length > 20) {
    //     callback(new Error("请输6-20个字符的密码"));
    //   } else if(value===this.editPwd.oldPwd){
    //       callback(new Error("新密码和原始密码相同!"));
    //   } else if (value!==this.editPwd.confirmPwd){
    //      this.$refs['editPwd'].validateField(['confirmPwd']);
    //   }
    //   callback();
    // };
    // let validateConPWd = (rule, value, callback) => {
    //   if (value === "" || value === null || value === undefined) {
    //     callback(new Error("确认密码不能为空!"));
    //   } else if (value.length < 6 || value.length > 20) {
    //     callback(new Error("请输6-20个字符的密码"));
    //   }else if(value===this.editPwd.oldPwd){
    //        callback(new Error("新密码和原始密码相同!"));
    //   }
    //   // else if(value!==this.editPwd.newPwd){
    //   //   this.$refs['editPwd'].validateField(['newPwd']);
    //   // }
    //   callback();
    // };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        const chrnum =
          /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
        if (!chrnum.test(value)) {
          callback(new Error("8-20位且必有数字+特殊字符+大小写字母"));
        }
        callback();
      }
    };
    let validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editPwd.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      bannerBg: require("assets/images/img-grzxbanner.png"),
      activeTag: 1,
      max: 11,
      form: {
        username: "",
        // sex: 1,
        nickname: "",
        phoneNumber: "",
        email: "",
      },
      rules: {
        nickname: [
          { required: true, message: "用户呢称不能为空", trigger: "blur" },
          // { min: 6, max: 20, message: "请输20个字符以内的昵称", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^[1][3-9][\d]{9}/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        // sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        email: [
          // { required: true, message: "邮箱不能为空", trigger: "blur" },
          // {
          //   pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          //   message: "请输入正确的邮箱",
          //   trigger: "blur",
          // },
          // { max: 50, message: "请输50个字符长度的邮箱", trigger: "blur" },
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      editPwd: {
        accessToken: "",
        oldPwd: null,
        newPwd: null,
        confirmPwd: null,
      },
      editRules: {
        oldPwd: [
          { required: true, validator: validateOldPWd, trigger: "blur" },
        ],
        newPwd: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        confirmPwd: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "blur",
          },
        ],
      },
      authRules: {
        tenantId: [
          { required: true, message: "请输入租户名称" },
          { min: 4, message: "租户名称必须至少有4个字符", trigger: "blur" },
          {
            pattern: "^[a-z0-9][a-z0-9-.]+[a-z0-9]$",
            message: "请输入正确的租户名称",
            trigger: "blur",
          },
        ],
        tenantCode: [
          { required: true, message: "请输入唯一标识" },
          { min: 4, message: "唯一标识必须至少有4个字符", trigger: "blur" },
          {
            pattern: "^[a-z0-9][a-z0-9-.]+[a-z0-9]$",
            message: "请输入正确的唯一标识",
            trigger: "blur",
          },
        ],
      },
      authForm: {
        tenantId: "",
        tenantName: "",
        tenantCode: "",
        comment: "",
      },
      tenantOptions: [],
      disabledCode: false,
      authData: {},
      showAuthForm: false,
      isFirst: false,
      failStatus: require("assets/images/failStatus.png"),
      successStatus: require("assets/images/successStatus.png"),
    };
  },
  created() {
    if (Cookies.get("userInfor") !== undefined) {
      this.form = JSON.parse(Cookies.get("userInfor"));
      this.$set(this.form, "sex", "男");
      this.$set(this.editPwd, "accessToken", this.form.accessToken);
    }
  },
  mounted() {
    this.getTenantApply();
    this.getTenantList();
  },
  methods: {
    //修改用户基本信息
    async handleSettingUser() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          let resData = await this.$homeApi.article.handleSettingInfor(
            this.form
          );
          if (resData.code === 200) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            Cookies.set("userInfor", JSON.stringify(this.form));
          }
        }
      });
    },
    async getTenantList() {
      let resData = await this.$homeApi.article.getTenantList();
      this.tenantOptions = resData.data;
    },
    clearvaliDate(index) {
      if (index === 1) {
        this.$refs["editPwd"].clearValidate(["confirmPwd"]);
      } else {
        this.$refs["editPwd"].clearValidate(["newPwd"]);
      }
    },
    //修改密码
    async handleEditPassword() {
      this.$refs["editPwd"].validate(async (valid) => {
        if (valid) {
          let obj = {
            accessToken: this.editPwd.accessToken,
            originCode: this.editPwd.oldPwd,
            code: this.editPwd.newPwd,
            confirmCode: this.editPwd.confirmPwd,
          };
          console.log(obj);
          let resData = await this.$homeApi.article.handleEditPwd(obj);
          if (resData.code === 200) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
          }
        }
      });
    },
    reset() {
      this.editPwd = {
        oldPwd: null,
        newPwd: null,
        confirmPwd: null,
      };
      this.$refs.editPwd.clearValidate();
    },
    async getTenantApply() {
      let resData = await this.$homeApi.article.getTenantApply();
      this.authData = resData.data || {};
      console.log(123123, Object.keys(this.authData));
      if (!Object.keys(this.authData).length) {
        this.isFirst = true;
      }
    },
    resetAuth() {
      this.$refs.authForm.clearValidate();
    },
    selectTenant(data) {
      const item = this.tenantOptions.find((item) => item.id === data);
      console.log(item);
      if (item) {
        this.authForm.tenantCode = item.tenantCode;
        this.authForm.tenantName = item.tenantName;
        this.disabledCode = true;
      } else {
        this.authForm.tenantCode = "";
        this.authForm.tenantName = this.authForm.tenantId;
        this.disabledCode = false;
        this.$nextTick(() => {
          this.$refs.authForm.clearValidate();
        });
      }
    },
    async commitAuth() {
      this.$refs["authForm"].validate(async (valid) => {
        if (valid) {
          let obj = cloneDeep(this.authForm);
          !this.disabledCode && delete obj.tenantId;
          let resData = await this.$homeApi.article.tenantApply(obj);
          if (resData.code === 1) {
            this.showAuthForm = false;
            this.isFirst = false;
            this.getTenantApply();
            this.$message({
              type: "success",
              message: "操作成功",
            });
          }
        }
      });
    },
    exitEdit() {
      this.form = JSON.parse(Cookies.get("userInfor"));
      this.$set(this.form, "sex", "男");
      this.$refs.form.clearValidate();
    },
    changeTag(index) {
      this.activeTag = index;
    },
  },
};
</script>
<style scoped lang="scss">
.banner-bg {
  font-size: 30px;
  text-align: center;
  position: relative;
  margin-top: -2px;
  color: #fff;
  img {
    width: 100%;
    height: auto;
  }
  .txt-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    .bigTxt {
      font-size: 32px;
      padding-top: 131px;
      padding-bottom: 31px;
    }
    .tagList li {
      margin-right: 78px;
    }
    .smallTxt {
      font-size: 16px;
    }
  }
  .active {
    color: #00a972;
    border-bottom: 2px solid #00a972;
  }
  .btn-group-item {
    margin-bottom: 0;
    margin-top: 50px;
  }
}
.status-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  .status-img {
    width: 48px;
    height: 48px;
    margin-bottom: 15px;
  }
  .status-text {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3d444f;
    line-height: 18px;
    display: inline-block;
    padding-bottom: 15px;
  }
  .info {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9ba3af;
    line-height: 24px;
    display: inline-block;
    padding-bottom: 20px;
    &.opinion {
      width: 640px;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
  .el-button {
    width: 108px;
    height: 32px;
    background: #18b073;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.context-wrapper {
  padding-left: 40px;
  .item-wrapper {
    .label {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3d444f;
      line-height: 14px;
      padding-right: 64px;
      width: 65px;
      display: inline-block;
      padding-bottom: 20px;
    }
    .value {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3d444f;
      line-height: 14px;
    }
  }
}

@media screen and (min-width: 1440px) and (max-width: 1685px) {
  .banner-bg {
    .txt-box {
      .bigTxt {
        font-size: 32px;
        padding-top: 100px;
        padding-bottom: 21px;
      }
      .smallTxt {
        font-size: 16px;
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .banner-bg {
    .txt-box {
      .bigTxt {
        font-size: 32px;
        padding-top: 70px;
        padding-bottom: 21px;
      }
      .smallTxt {
        font-size: 16px;
      }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px) {
  .banner-bg {
    .txt-box {
      .bigTxt {
        font-size: 32px;
        padding-top: 60px;
        padding-bottom: 21px;
      }
      .smallTxt {
        font-size: 16px;
      }
    }
  }
}
.content-wrapper {
  width: 476px;
  margin: 0 auto;
  padding: 53px 0;
}
.group-btn-f {
  width: 48%;
}
.group-btn {
  width: 47.5%;
}
</style>
<style>
#user-center .el-form-item__label {
  font-size: 18px;
  height: 38px;
  color: #1a1a1a;
}
#user-center .el-input__inner:focus {
  border-color: #00a972;
}
#user-center .el-form-item__content {
  width: 338px;
  margin-left: 140px !important;
}
#user-center .el-input__inner {
  width: 338px;
  height: 38px;
  color: #333;
  background: #f7f7f7;
  border: 1px solid #b3b3b3;
}
#user-center .el-button {
  font-size: 15px;
}
#user-center .el-button--default:active {
  color: #00a972;
}
#user-center .el-button--default:focus {
  color: #00a972;
}
#user-center .el-input {
  font-size: 16px;
}
#user-center .el-form-item__label {
  padding: 0 12px 0 0;
}
#user-center .el-radio__input.is-checked .el-radio__inner {
  border-color: #02a570;
  background: #02a570;
}
#user-center .el-radio__input.is-checked + .el-radio__label {
  color: #666666;
}
</style>
