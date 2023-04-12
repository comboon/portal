<template>
  <div id="marketelement-detail">
    <div class="navBar">
      <span @click="handleToCenter">应用市场</span>
      <span> ></span>
      <span class="activeNav">应用详情</span>
    </div>

    <div class="top-wrap">
      <div class="top-left-box">
        <div class="left-flex-box">
          <div class="logoImg-box">
            <img :src="dataInfor.imageUrl" alt="" />
          </div>
          <div class="text-infor-box">
            <h3>{{ dataInfor.name }}</h3>
            <p class="ellipsis txtP">{{ dataInfor.description }}</p>
            <div class="formItem">
              <div>
                规格：<span>{{ dataInfor.specificationName }}</span>
              </div>
              <div>
                付费方式：<span>{{ dataInfor.payMethodName }}</span>
              </div>
            </div>

            <div class="btn-group" v-if="view">
              <el-button
                type="primary"
                @click="handlePay"
                :disabled="formData.payMentMethods !== '1'"
                >立即购买</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="top-right-box">
        <div class="auther-wrap">
          <p>
            <img :src="developersImg" />
            <span class="developer-span">{{ dataInfor.developer }} </span>
          </p>
        </div>
        <div class="auther-infor">
          <p>
            产品分类: <span>{{ dataInfor.productType }}</span>
          </p>
          <p>
            行业分类: <span>{{ dataInfor.industryType }}</span>
          </p>
          <p>
            领域分类: <span>{{ dataInfor.domainTypeName }}</span>
          </p>
          <p>
            交付方式: <span>{{ dataInfor.deliveryMethod }}</span>
          </p>
          <p>
            上架时间: <span>{{ dataInfor.publishTime }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="line-box"></div>
    <div class="main-wrap">
      <ul class="navBarList">
        <li
          v-for="(item, index) in tabbarList"
          :key="item.id"
          @click="handleChangeTag(index)"
          :class="{ active: activeIndex === index }"
        >
          {{ item.type }}
        </li>
      </ul>
      <div class="content-box">
        <div class="descContent" v-html="activeObj.description"></div>
      </div>
    </div>

    <el-dialog width="700" destroy-on-close :visible.sync="visible">
      <template #title>
        <div class="title">
          <span>{{ dataInfor.name }}</span>
        </div>
      </template>

      <div class="content">
        <div class="content-item">
          <p class="content-item-title">购买方式</p>
          <p>{{ formData.payMentMethods.unit }}</p>
        </div>
        <div class="content-item">
          <p class="content-item-title">申请时间</p>
          <p>{{ currentTime() }}</p>
        </div>
        <div class="content-item">
          <p class="content-item-title">申请人</p>
          <p>{{ userInfor.nickname }}</p>
        </div>
        <div class="content-item">
          <p class="content-item-title">申请人联系方式</p>
          <p>
            {{
              userInfor.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
            }}
          </p>
        </div>
        <div class="content-item">
          <p class="content-item-title">租户</p>
          <p>
            <el-select
              v-model="marketData.tenantId"
              @change="handleTenant"
              placeholder="请选择"
            >
              <el-option
                v-for="item in marketOption"
                :key="item.tenantId"
                :label="item.tenantName"
                :value="item.tenantId"
              >
              </el-option>
            </el-select>
          </p>
        </div>

        <div
          class="content-item"
          v-if="marketData.tenantId != '' || dataInfor.provideType == 1"
        >
          <p class="content-item-title">环境</p>
          <p>
            <el-select
              v-model="marketData.EnvId"
              @change="handleEnv"
              placeholder="请选择"
            >
              <el-option
                v-for="item in EnvListOption"
                :key="item.envId"
                :label="item.envName"
                :value="item.envId"
              >
              </el-option>
            </el-select>
          </p>
        </div>

        <div
          class="content-item"
          v-if="marketData.EnvId != '' && dataInfor.provideType !== 2"
        >
          <p class="content-item-title">集群</p>
          <p>
            <el-select v-model="marketData.ClusterId" placeholder="请选择">
              <el-option
                v-for="item in ClusterListOption"
                :key="item.clusterId"
                :label="item.clusterName"
                :value="item.clusterId"
              >
              </el-option>
            </el-select>
          </p>
        </div>

        <div v-if="dataInfor.provideType == 1">
          <div
            class="content-item"
            v-if="marketData.tenantId != '' && marketData.EnvId != ''"
          >
            <vue-form
              v-model="submitData"
              :formFooter="{ show: false }"
              :schema="schema"
            ></vue-form>
          </div>
        </div>

        <div v-if="dataInfor.provideType == 2">
          <div class="content-item">
            <p class="content-item-title">角色</p>
            <p>
              <el-select v-model="marketData.roleName" placeholder="请选择">
                <el-option
                  v-for="item in roleOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </p>
          </div>
        </div>

        <div class="content-item">
          <p class="content-item-title">申请说明</p>
          <p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入内容"
              v-model="marketData.comment"
            >
            </el-input>
          </p>
        </div>
      </div>

      <template #footer>
        <div class="footer">
          <span class="footer-total">
            总价：<span
              class="footer-total-price"
              v-if="formData.payMentMethods && formData.payMentMethods.price"
              >￥{{ formData.payMentMethods.price.CNY || 0.0 }}</span
            >

            <span class="footer-total-price" v-else>￥ 0.00</span>
          </span>

          <div class="button-box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">立即购买</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import Cookies from "js-cookie";
export default {
  name: "marketDetail",
  layout: "BaseLayout",
  data() {
    return {
      age: "12",
      serverType: null,
      activeIndex: 0,
      activeObj: {},
      yearNum: "",
      dataInfor: {},
      tabbarList: {},
      queryObj: {},
      //默认查看所有内容
      view: true,
      developersImg: require("assets/images/ico-yysc-sj.svg"),
      formData: {
        selectedSpecifications: "", //选中的规格
        payMentMethods: "1", //付费方式
      },
      marketData: {
        tenantId: "",
        EnvId: "",
        ClusterId: "",
        roleName: "",
        comment: "",
      },
      marketOption: [],
      EnvListOption: [],
      ClusterListOption: [],
      roleOption: [
        {
          value: "admin",
          label: "admin",
        },
        {
          value: "user",
          label: "user",
        },
      ],
      payList: [],
      submitData: {},
      schema: {},
      totalPrice: null, //总价
      planId: -1,
      visible: false,
      userInfor: {
        nickname: "",
        phoneNumber: "",
      },
    };
  },
  created() {
    // 嵌套子页面页面位置
    window.scrollTo(0, this.currentScrollTop);
    this.queryObj = this.$route.query;
    if (this.queryObj.view) {
      this.view = false;
    }
    this.getDetail(this.queryObj.id);
    // this.setTenantList();
  },
  watch: {
    $route(n, o) {
      console.log(n.query.id);
      if (n.query.id !== o.query.id) {
        //监听路由参数是否变化
        location.reload();
      }
      console.log(n);
    },
  },
  methods: {
    currentTime() {
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    //获取详情
    async getDetail(id) {
      this.dataInfor = (
        await this.$homeApi.article.handleGetMarketDetail(id)
      ).data;
      this.tabbarList = this.dataInfor.marketelementdetaillCfgList;
      this.activeObj = this.tabbarList[this.activeIndex];
      this.dataInfor.imageUrl = process.env.NUXT_ENV + this.dataInfor.imageUrl;

      this.dataInfor.marketServicePlanCfgList.forEach((item) => {
        if (item.marketelementunitCfgList.length > 0) {
          item.marketelementunitCfgList.forEach((cata) => {
            cata.price = JSON.parse(cata.price);
          });
        }
      });
      console.log(this.dataInfor);
    },
    //获取选中的规格
    handleChange() {
      console.log(this.formData.selectedSpecifications);
      this.dataInfor.marketServicePlanCfgList.forEach((item) => {
        if (item.name === this.formData.selectedSpecifications) {
          this.payList = item.marketelementunitCfgList;
          this.planId = item.id;
        }
      });
      console.log(this.planId);
      console.log(this.payList);
      this.totalPrice = null;
      this.formData.payMentMethods = "1";
    },
    //获取选中的付费方式
    handleChangePay() {
      console.log(this.formData.payMentMethods);
      this.totalPrice = this.formData.payMentMethods.price["CNY"];
    },
    // 获取租户
    async setTenantList() {
      let res = await this.$homeApi.article.getTenantListData();
      if (res.code == 200) {
        this.marketOption = res.data;
      }
    },
    handleTenant(val) {
      this.setEnvList(val);
      if (this.marketData.tenantId != "" && this.marketData.EnvId != "") {
        this.setParamList();
      }
    },
    // 获取环境
    async setEnvList(id) {
      let res = await this.$homeApi.article.getEnvList({ tenantId: id });
      if (res.code == 200) {
        this.EnvListOption = res.data;
      }
    },
    // 获取环境
    async setClusterList(envId) {
      let res = await this.$homeApi.article.getClusterList(
        this.marketData.tenantId,
        envId
      );
      if (res.code == 200 || res.code == 1) {
        this.ClusterListOption = res.data;
      }
    },
    // 获取动态表单
    handleEnv(val) {
      this.setClusterList(val);
      if (this.dataInfor.provideType == 1) {
        this.setParamList();
      }
    },
    async setParamList() {
      let data = {
        marketElementId: this.queryObj.id,
        envId: this.marketData.EnvId,
      };
      let res = await this.$homeApi.article.getParamList(data);
      console.log(res);
      if (res.code == 200) {
        this.schema = res.data;
      }
    },
    //购买
    async handlePay() {
      let fullPath = this.$route.fullPath;
      const userInfor = Cookies.get("userInfor");
      if (userInfor === undefined) {
        this.$confirm("您暂未登录, 前往登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({
              name: "login",
              params: {
                path: fullPath,
              },
            });
          })
          .catch(() => {});
      } else {
        this.userInfor = JSON.parse(userInfor);
        this.visible = true;
        this.setTenantList();
      }
    },

    handleChangeTag(index) {
      this.activeIndex = index;
      this.activeObj = this.tabbarList[this.activeIndex];
    },
    handleToCenter() {
      this.$router.push({
        name: "applicationMarket",
        query: {
          pageNum: this.queryObj.pageNum,
          pageSize: this.queryObj.pageSize,
          tags: this.queryObj.tags,
        },
      });
    },

    cancel() {
      this.visible = false;
    },

    async confirm() {
      let userInfor = JSON.parse(Cookies.get("userInfor"));
      let marketBuyParam = {};
      if (this.marketData.tenantId == "") {
        this.$message.error("租户不能为空");
        return;
      }
      if (this.marketData.EnvId == "") {
        this.$message.error("环境不能为空");
        return;
      }
      if (this.dataInfor.provideType == 1 && this.marketData.ClusterId == "") {
        this.$message.error("集群不能为空");
        return;
      }
      if (this.dataInfor.provideType == 1) {
        marketBuyParam = {
          applyUser: userInfor.nickname,
          applyUserPhone: userInfor.phoneNumber,
          elementId: this.queryObj.id,
          planList: [
            {
              planId: this.planId,
              unitIds: this.formData.payMentMethods.id,
            },
          ],
          price: this.totalPrice,
          priceUnit: "CNY",
          envId: this.marketData.EnvId,
          envName: this.filterEnvId(this.marketData.EnvId),
          tenantId: this.marketData.tenantId,
          tenantName: this.filterUserName(this.marketData.tenantId),
          clusterId: this.marketData.ClusterId,
          clusterName: this.filterClusterName(this.marketData.ClusterId),
          valueForm: JSON.stringify(this.submitData),
          comment: this.marketData.comment,
        };
      } else {
        if (this.marketData.roleName == "") {
          this.$message.error("角色不能为空");
          return;
        }
        marketBuyParam = {
          applyUser: userInfor.nickname,
          applyUserPhone: userInfor.phoneNumber,
          elementId: this.queryObj.id,
          planList: [
            {
              planId: this.planId,
              unitIds: this.formData.payMentMethods.id,
            },
          ],
          price: this.totalPrice,
          priceUnit: "CNY",
          roleName: this.marketData.roleName,
          envId: this.marketData.EnvId,
          envName: this.filterEnvId(this.marketData.EnvId),
          tenantId: this.marketData.tenantId,
          tenantName: this.filterUserName(this.marketData.tenantId),
          comment: this.marketData.comment,
        };
      }
      let res = await this.$homeApi.article.handlePayForMarket(marketBuyParam);
      console.log(res);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: res.msg,
        });
      }
      this.visible = false;
      this.$router.push({
        name: "applicationMarket",
      });
    },
    filterUserName(id) {
      let text = "";
      this.marketOption.filter((node) => {
        if (node.tenantId == id) {
          text = node.tenantName;
        }
      });
      return text;
    },
    filterClusterName(id) {
      let text = "";
      this.ClusterListOption.filter((node) => {
        if (node.clusterId == id) {
          text = node.clusterName;
        }
      });
      return text;
    },
    filterEnvId(id) {
      let text = "";
      this.EnvListOption.filter((node) => {
        if (node.envId == id) {
          text = node.envName;
        }
      });
      return text;
    },
  },
};
</script>
<style scoped lang="scss">
#marketelement-detail {
  background: #fff;
  overflow: hidden;

  .navBar {
    margin: 0 12%;
    padding: 56px 0 36px 0;
  }

  .line-box {
    height: 16px;
    background: #eff3f4;
  }

  .navBar span {
    width: 175px;
    height: 20px;
    font-size: 20px;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }

  .navBar .activeNav {
    color: #00a972;
  }
}

.txtP {
  font-size: 14px;
  color: #808080;
  margin-bottom: 20px;
}

.auther-wrap {
  box-sizing: content-box;
  padding: 30px 0 15px 0;
}

.auther-wrap p img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
  #marketelement-detail {
    .top-wrap .top-left-box .left-flex-box .text-infor-box h3 {
      padding: 0;
      margin: 0;
      font-size: 18px;
      color: #333333;
      font-weight: 400;
      margin-bottom: 26px;
    }

    .top-wrap .top-left-box .left-flex-box .text-infor-box .formItem span {
      font-size: 16px;
    }

    .top-wrap .top-right-box .auther-wrap {
      height: 40px;
      line-height: 40px;

      p span {
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .top-wrap .top-right-box .auther-infor p {
      font-size: 14px;

      span {
        color: #808080;
        // vertical-align: middle;
      }
    }
  }
}

.navBarList {
  text-align: center;
  padding: 0 0 0 20px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 28px;

  li {
    display: inline-block;
    font-size: 20px;
    margin-right: 65px;
    cursor: pointer;
    color: #333333;
    padding-bottom: 26px;
  }

  li:last-child {
    margin-right: 0;
  }

  .active {
    color: #02a670;
    border-bottom: 2px solid #02a670;
  }
}

.top-wrap,
.main-wrap {
  margin: 0 12%;
  padding: 53px 0;
  background: #fff;
}

.main-wrap {
  min-height: 400px;
  margin-bottom: 20px;
}

.top-wrap {
  margin-bottom: 20px;
  display: flex;

  .top-left-box {
    flex: 0 0 65%;
    height: 100%;

    .left-flex-box {
      display: flex;
      margin-right: 50px;

      .logoImg-box {
        flex: 0 0 22%;

        img {
          width: 137px;
          height: 154px;
        }
      }

      .text-infor-box {
        flex: 0 0 70%;
        padding: 0 25px;

        h3 {
          padding: 0;
          margin: 0;
          font-size: 18px;
          color: #333333;
          font-weight: 400;
          margin-bottom: 26px;
        }

        .formItem {
          font-size: 18px;
          margin-bottom: 20px;

          span {
            /* vertical-align: top; */
            font-size: 16px;
          }

          .totalSpan {
            color: #02a670;
            font-weight: bold;
            margin-top: 2px;
          }
        }

        .btn-group {
          margin: 5px 0;
          font-size: 20px;
        }
      }
    }
  }

  .top-right-box {
    flex: 1;
    height: 100%;
    background: #fafafa;
    padding: 0 20px;

    p {
      padding: 0;
      margin: 0;
    }

    .auther-wrap {
      border-bottom: 1px solid #cccccc;
      height: 60px;
      line-height: 60px;
      margin-bottom: 12px;

      .developIcon {
        color: #2375c7;
        font-size: 26px;
        margin-right: 10px;
      }

      .developer-span {
        font-weight: 400;
        color: #1a1a1a;
        font-size: 18px;
        font-weight: 400;
        margin-left: 10px;
        vertical-align: middle;
      }
    }

    .auther-infor {
      padding: 30px 0 42px 0;

      p {
        color: #333333;
        font-size: 16px;
        margin-bottom: 20px;

        span {
          color: #808080;
        }
      }
    }
  }
}
</style>
<style>
.marketelement-detail .el-input--small .el-input__inner {
  height: 22px !important;
  width: 40px !important;
  line-height: 32px !important;
}

.text-infor-box .el-radio__label {
  font-size: 18px !important;
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .text-infor-box .el-radio__label {
    font-size: 16px !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
  .text-infor-box .el-radio__label {
    font-size: 14px !important;
  }
}

.text-infor-box .el-radio {
  display: block;
  margin: 2px 0 20px 10px;
}
</style>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #333333;
}

::v-deep .el-dialog {
  &__body,
  &__footer {
    background: #f2f2f2;
  }

  &__body {
    padding: 36px 36px 0;
  }

  &__footer {
    padding: 24px 36px;
  }
}

.content {
  box-sizing: border-box;
  padding-bottom: 36px;
  border-bottom: 1px solid #e6e6e6;

  &-item {
    margin-bottom: 10px;

    p {
      font-size: 14px;
      color: #333333;
      box-sizing: border-box;
      padding-left: 12px;
      line-height: 28px;
    }

    &-title {
      position: relative;
      font-weight: bold;

      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        background: #999999;
        border-radius: 50%;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-total {
    font-weight: bold;
    font-size: 14px;

    &-price {
      margin-right: 10px;
      font-size: 20px;
      color: #ff3939;
    }
  }

  .el-button {
    width: 120px;
    font-size: 16px;
  }
}

::v-deep .el-dialog__wrapper {
  display: flex;

  .el-dialog {
    margin-top: auto !important;
    margin-bottom: auto !important;

    &__header {
      height: 60px;
      box-sizing: border-box;
      padding: 20px 36px;
      position: relative;
      font-size: 18px;
      color: #333333;

      &btn {
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
      }
    }
  }
}
::v-deep .el-textarea__inner:focus {
  border-color: #5fd1ad !important;
}

::v-deep .el-select .el-input.is-focus .el-input__inner {
  border-color: #5fd1ad !important;
}
</style>
