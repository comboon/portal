<template>
  <div class="aboutUS">
    <div class="banner-bg">
      <img :src="bannerBg">
       <div class="txt-box">
          <p class="bigTxt">帮助中心</p>
        <p class="smallTxt">帮助中心提供平台一切文档的查看。</p>
       </div>
          <div class="banner-footer">
               <ul class="tagList">
                    <li
              :class="{ active: $store.state.helpActiveIndex === 1 }"
              @click="changeNav(1)"
            >
              新手指南
            </li>
            <li
              :class="{ active: $store.state.helpActiveIndex === 2 }"
              @click="changeNav(2)"
            >
             帮助文档
            </li>
              <li
              :class="{ active: $store.state.helpActiveIndex === 3 }"
              @click="changeNav(3)"
            >
            平台资料
            </li>
                </ul>
       </div>
    </div>

    <div v-if="$store.state.helpActiveIndex === 1">
      <div class="content-wrapper">
        <div class="joinPlat">
          <p class="join-title">如何上平台?</p>
          <div class="description">
           容器引擎是在云平台上构建的企业级分布式多租户的 Kubernetes 容器服务管理平台，集成了云平台的云服务器、存储、网络等资源，可一键部署高可用、高性能的 Kubernetes 集群，支持CI/CD、多集群管理、微服务治理、应用管理、服务与网络管理等业务场景，让您轻松高效地在云端运行 Kubernetes 容器化应用。
           本次发布支持创建及管理托管版集群，后续将支持自管版集群，敬请期待。
          </div>
          <div class="progress">
            <el-steps :space="200" finish-status="success">
              <el-step title="选择项目模板"></el-step>
              <el-step title="选择项目人员"></el-step>
              <el-step title="选择工具"></el-step>
              <el-step title="自定义配置"></el-step>
              <el-step title=" 完成"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="joinPlat">
          <p class="join-title">如何成为我们的伙伴</p>
          <div class="description">
           容器引擎 QKE 依托于 QingCloud 公有云 IaaS 层能力，并针对资源调用和管理的对接进行了优化处理。
    容器引擎 QKE 支持原生 Kubernetes 能力，并基于原生 Kubernetes 能力进行了增强和扩展，支持集群管理、资源管理、应用管理等功能的可视化控制。
    在容器引擎 QKE 基础之上，可扩展安装 KubeSphere、Kubernetes Dashboard 等可视化管理工具，并支持对接云平台服务及第三方开源服务。
          </div>
          <div class="btn-wrapper">
            <el-button type="primary">获取联系方式</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="frame-box" v-if="$store.state.helpActiveIndex === 2">
      <iframe id="iframe1" width="100%" height="1000px" style="border: 0" :src="iframeSrc_help"></iframe>
    </div>
    <div class="frame-box" v-if="$store.state.helpActiveIndex === 3">
      <iframe id="iframe2" width="100%" height="1000px" style="border: 0" :src="iframeSrc_resource"></iframe>
    </div>
  </div>
</template>
<script>
import cookies from "js-cookie";
export default {
  name: "aboutUS",
  layout: "BaseLayout",
  data() {
    return {
       bannerBg:require('assets/images/img-bzzxbanner.png'),
       iframeSrc_help:"",
       iframeSrc_resource:"",
    };
  },
  created(){
   /**
    * desc: process.env.NUXT_ENV  根据部署的地址来设置ifrmae的 src
    *
    */
    if(process.env.NUXT_ENV==="http://10.70.12.11:33676"){//道客测试
      this.iframeSrc_help="http://10.70.12.11:39016/help/doc/intro/instance/";
      this.iframeSrc_resource="http://10.70.12.11:39016/help/resource/intro/instance/";
    }else if(process.env.NUXT_ENV==="http://10.18.30.122:33676"){//东方测试
      this.iframeSrc_help="http://10.18.30.122:39016/help/doc/intro/instance/";
      this.iframeSrc_resource="http://10.18.30.122:39016/help/resource/intro/instance/";
    }else{//其他
      this.iframeSrc_help="http://139.155.237.242:8016/help/doc/intro/instance/";
      this.iframeSrc_resource="http://139.155.237.242:8016/help/resource/intro/instance/";
    }
  },
  methods: {
    /**
     * methods: changeNav
     * desc : 切换导航的时候，更新store 中的状态 和cookie中的值
     * cookie 中的状态是防止刷新页面的时候 store 中的状态丢失导致错误
     */
    changeNav(index) {
      this.$store.commit("setHelpActive", index);
      cookies.set("helpActiveIndex", index);
    },
  },
};
</script>
<style scoped lang="scss">
.aboutUS {
  .banner-bg {
    margin-top:-2px;
    color:#fff;
    text-align: center;
    position: relative;
      img{
        width:100%;
        height:auto
      }
     .txt-box{
          position: absolute;
        top:0;
        width:100%;
        height:100%;
         .bigTxt{
      font-size: 32px;
      padding-top:131px;
      padding-bottom:31px;
    }
    .smallTxt{
      font-size: 16px;
    }
     }
     .banner-footer{
        bottom: 2px;
    }
  }
  .active{
    color:#00a972;
    border-bottom: 2px solid #00a972;
  }
  .content-wrapper {
    margin: 0 238px;
    margin-top: 75px;
    margin-bottom: 20px;
    .joinPlat {
      .join-title {
        font-size: 16px;
        font-weight: bold;
        color:#333;
        margin-bottom: 20px;
      }
      .description {
        font-size:14px;
        color:#333;
        margin-bottom: 30px;
      }

    }
  }
}

@media screen and (min-width: 1440px) and (max-width: 1680px){
 .aboutUS .banner-bg {
     .txt-box{
        .bigTxt{
      font-size: 32px;
      padding-top:80px;
      padding-bottom:21px;
    }
    .smallTxt{
      font-size: 16px;
    }
     }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
 .aboutUS .banner-bg {
     .txt-box{
         .bigTxt{
        font-size: 32px;
        padding-top:65px;
        padding-bottom:21px;
      }
      .smallTxt{
        font-size: 16px;
      }
     }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
.aboutUS .banner-bg {
   .txt-box{
       .bigTxt{
      font-size: 32px;
      padding-top:55px;
      padding-bottom:21px;
    }
    .smallTxt{
      font-size: 16px;
    }
   }
  }
}
</style>
<style lang="scss">
.progress .el-step__icon {
  /* width: 36px !important;
  height: 36px !important;
  line-height: 36px !important; */
}
.progress .el-step__icon.is-text {
  border: 1px solid #00a972 !important;

  .el-step__icon-inner {
    font-size: 14px;
    font-weight: normal;
    color: #00a972;
  }
}
.progress .el-step__line {
  /* height: 10px !important; */
  background: #00a972 !important;
  /* top: 13px !important; */
}

.progress .el-step__title {
  font-size: 14px;
}

.frame-box {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
