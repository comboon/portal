<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24" class="col-title-box">
        <p>市场元素概括</p>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="split-row">
      <el-col :sm="10" :lg="8" >
       <p>
         <span class="applyCount">
            订单数量:
         </span>
         <i class="count-num">{{dataInfor.waitHandleNum}}&nbsp;&nbsp;条</i>
        <el-button type="text" @click="gotoAplyyPage">
          立即查看&nbsp;>
        </el-button>
       </p>
      </el-col>
<!--      <el-col :sm="10" :lg="8" >
        <p>
           <span class="applyCount">
            累计申请数量:
         </span>
         <i class="count-nums">{{dataInfor.sumHandleNum}}&nbsp;&nbsp;条</i>
        </p>
      </el-col>-->
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24" :lg="24" class="col-title-box">
        <p>数量总汇</p>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="split-row">
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">市场元素:</span>
          <i class="num-i">{{dataInfor.marketElementNum}}条</i>
        </p>
      </el-col>
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">解决方案:</span>
          <i class="num-i">{{dataInfor.solutionNum}}条</i>
        </p>
      </el-col>
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">新闻中心:</span>
          <i class="num-i">{{dataInfor.newsCenterNum}}条</i>
        </p>
      </el-col>
    </el-row>

     <el-row :gutter="20">
      <el-col :sm="21" :lg="21" class="col-title-box">
        <p>管理员登陆</p>
      </el-col>
      <el-col :sm="3" :lg="3"  class="col-title-box">
        <p>
           <el-button type="text" @click="gotoLogsPage">
          更多&nbsp;>
        </el-button>
        </p>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-for="(item,index) in loginList" :key="index">
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">ip地址:</span>
          <i class="num-i">{{item.ipaddr}}</i>
        </p>
      </el-col>
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">管理员:</span>
          <i class="num-i">{{item.userName}}</i>
        </p>
      </el-col>
      <el-col :sm="8" :lg="8" >
        <p>
          <span class="text-span">操作时间:</span>
          <i class="num-i">{{item.loginTime}}</i>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHomeDataInfor } from "@/api/home"

export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.0",
      dataInfor:{
        waitHandleNum:null,
        sumHandleNum:null,
        solutionNum:null,
        newsCenterNum:null,
        marketElementNum:null,
      },
      loginList:[],
    };
  },
  mounted(){
    this.getDatainfor();
  },
  methods: {
    //获取首页数据
    getDatainfor(){
      getHomeDataInfor().then(res=>{
        this.dataInfor.waitHandleNum=res.data.waitHandleNum;
        this.dataInfor.sumHandleNum=res.data.sumHandleNum;
        this.dataInfor.solutionNum=res.data.solutionNum;
        this.dataInfor.newsCenterNum=res.data.newsCenterNum;
        this.dataInfor.marketElementNum=res.data.marketElementNum;
        this.loginList=res.data.loginInfoList;
      })
    },
    goTarget(href) {
      window.open(href, "_blank");
    },
    //前往元素申请审合页面立即处理
    gotoAplyyPage(){
       this.$router.push({
        path:"/marketelement/marketelementapply",
        query:{
          applyStatus:"0"
        }
      })
    },
    //查看更多日志
    gotoLogsPage(){
      this.$router.push({
        path:"/system/log/logininfor"
      })
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  .col-title-box{
    height: 66px;
    line-height: 30px;
    border-radius: 5px 5px 0px 0px;
    background-color: rgba(250, 250, 250, 100);
    border-bottom: 1px solid #e5e5e5;
  }
 .el-col{
     padding: 0 24px !important;
     .applyCount,.text-span{
       color: rgba(96, 96, 96, 100);
       font-size: 14px;
     }
     p{
       line-height: 33px;
     }
     .count-num{
       margin:0 21px 0 11px;
       color:#E33914;
       font-size:20px;
     }
     .count-nums{
        margin:0 21px 0 11px;
       color:#1990FF;
       font-size:14px;
     }
     .num-i{
       color:#18b073;
       font-size:14px;
       margin: 0 24px;
     }
  }
  .split-row{
    margin-bottom: 48px;
  }
}
</style>

