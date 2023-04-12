<template>
  <div class="newsDetail-wrapper">
    <div class="navBar">
      <span @click="handleToCenter">新闻中心</span>
        <i class="el-icon-arrow-right right-icon"></i>
      <span class="activeNav">新闻详情</span>
    </div>
    <div class="news-title">
      <h1>{{ detailInfor.title }}</h1>
    </div>
    <div class="news-description" v-html="detailInfor.description"></div>
  </div>
</template>
<script>
export default {
  name: "newsDetail",
  layout: "BaseLayout",
  data() {
    return {
      detailInfor: {},
      queryObj:{},
    };
  },
  created() {
    this.queryObj=this.$route.query;
    console.log(this.queryObj);
    this.getDetail(this.queryObj.id);
  },
  methods: {
    /**
     * methods: getDetail
     * params :  id 新闻id
     * desc: 根据对应新闻id 获取详情信息
     */
    async getDetail(id) {
      this.detailInfor = (
        await this.$homeApi.article.handleGetNewsDetail(id)
      ).data;
    },
    //跳转回新闻中心，路由传参，请求之前的页码的数据
    handleToCenter(){
      this.$router.push({
        name:"newsCenter",
        query:{
            menuid:this.queryObj.menuid,
            index:this.queryObj.index,
            pageNum:this.queryObj.pageNum
        }
      })
    }
  },
};
</script>
<style scoped lang="scss">
@media screen and (min-width: 1680px) and (max-width: 1920px){
  .navBar{
  padding-top:20px;
  span{
    margin:10px 5px;
    font-size:18px;
    cursor: pointer;
  }
  .activeNav{
    color:#02A670;
  }
  .right-icon{
    font-size:18px;
  }
}
.newsDetail-wrapper {
  margin: 0 238px;
  .news-title {
    text-align: center;
    padding: 20px 0;
  }
}
}
@media screen and (min-width: 1440px) and (max-width: 1680px){
    .navBar{
  padding-top:20px;
  span{
    margin:10px 5px;
    font-size:17px;
    cursor: pointer;
  }
  .activeNav{
    color:#02A670;
  }
  .right-icon{
    font-size:17px;
  }
}
.newsDetail-wrapper {
  margin: 0 210px;
  .news-title {
    text-align: center;
    padding: 20px 0;
  }
}
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
      .navBar{
  padding-top:20px;
  span{
    margin:10px 5px;
    font-size:15px;
    cursor: pointer;
  }
  .activeNav{
    color:#02A670;
  }
  .right-icon{
    font-size:15px;
  }
      }
      .newsDetail-wrapper {
        margin: 0 200px;
        .news-title {
          text-align: center;
          padding: 20px 0;
        }
      }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
    .navBar{
  padding-top:20px;
  span{
    margin:10px 5px;
    font-size:14px;
    cursor: pointer;
  }
  .activeNav{
    color:#02A670;
  }
  .right-icon{
    font-size:14px;
  }
      }
      .newsDetail-wrapper {
        margin: 0 190px;
        .news-title {
          text-align: center;
          padding: 20px 0;
        }
      }
}
</style>