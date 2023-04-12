<template>
  <div class="platformDetail">
     <div class="banner-bg">
       <p class="bigTxt">平台能力</p>
       <p class="smallTxt">利用大数据核心技术应用于工业设备或电站维护的工况预测，如发电设备的异常预测/寿命预测等等；</p>
    </div>
     <div class="content">
       <div class="right-main">
          <div class="main-title">
            {{descInfor.capName}}
          </div>
          <div class="desc" v-html="descInfor.detail">
            
          </div>
       </div>
     </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "platformDetail",
  layout: "BaseLayout",
  data(){
    return {
      activeIndex:-1,
      list:[],
      descInfor:{
        serviceName:null,
        description:null,
      }
    }
  },
  watch:{
    $route(n,o){
        if(n.fullPath !== o.fullPath){ //监听路由参数是否变化
            location.reload()  
        }
    }
  },
  async created(){
    this.handleChange(this.$route.query.id)
  },
  methods:{
    //获取平台能力的数据
   async handleChange(id){
      let res= (await this.$homeApi.article.handleGetPlatFormDetail(id)).data;
      if(res!==null){
          this.descInfor=res;
        }
    }
  }
};
</script>
<style scoped lang="scss">
.main-title{
  text-align: center;
  color: #333333 ;
  font-size:32px;
  margin-bottom: 50px;
}
  .platformDetail{
  .content{
     padding:40px 12%;  
    display: flex;
    .left-nav{
       flex: 0 0 200px;
      .navList{
        li{
          font-size:20px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          span{
            cursor: pointer;
          }
         .active{
          color:#02A670;
        } 
        }
        
      }
    }
    .right-main{
      padding: 10px 20px;
    }
  }
  .banner-bg{
  margin-top:-2px;
  height: 425px;
  position: relative;
   color:#fff;
   text-align: center;
    background: url("~/assets/images/defaultBg.png") no-repeat;
    background-size: 100% 100%;
  .bigTxt{
      font-size: 32px;
      padding-top:131px;
      padding-bottom:31px;
    }
    .smallTxt{
      font-size: 16px;
    }
}
@media screen and (min-width: 1440px) and (max-width: 1680px){
.banner-bg{
  background: url("~/assets/images/img-cpffbanner-1680.jpg") no-repeat;
}
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
.banner-bg{
  background: url("~/assets/images/img-cpffbanner-1440.jpg") no-repeat;
}
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
 .banner-bg{
   background: url("~/assets/images/img-cpffbanner-1280.jpg") no-repeat;
  } 
}
}

</style>