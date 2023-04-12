<template>
  <div class="newsCenter">
    <div class="banner-bg">
      <img :src="bannerBg">
      <div class="txt-box">
             <p class="bigTxt">新闻中心</p>
        <p class="smallTxt">新闻中心提供国内外最新行业与热点资讯，是一个专门为移动设备手机和平板电脑等提供应用下载服务的电子应用商店。</p>
        </div>
       <div class="banner-footer">
               <ul class="tagList">
                  <li
                    :class="{ active: activeIndex === index }"
                    v-for="(item, index) in typeList"
                    :key="item.id"
                    @click="handleChangeType(item.id, index)"
                  >
                    {{ item.menuName }}
                  </li>
                </ul>
       </div>
    </div>
    <div class="news-content">
      <div class="news-list">
        <div class="hotList">
            <div class="hotItem"  v-for="news in hotList" :key="news.id">
                <img :src="news.img" alt=""  @click="handleDetail(news.id)">
                <div class="newsInfor">
                   <div class="newsTitle">
                     <p @click="handleDetail(news.id)">{{news.title}}</p>
                   </div>
                   <div>
                     <span class="hotBtn">置顶</span>
                     <span class="dateTxt">{{news.publishTime}}</span>
                   </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="list-content" v-if="newsList.length > 0">
          <div class="list-item" v-for="(item, index) in newsList" :key="index">
            <div class="item-infor">
              <div class="itemTitle">
                <span class="dayTxt">{{item.day}}日</span>
                <span class="dateTxt">{{item.month}}</span>

                <span class="viewNumTxt">浏览次数 <span class="viewNum">{{ item.viewNum }}</span></span>

            </div>
              <p class="infor-title" @click="handleDetail(item.id)">
                {{ item.title }}
              </p>
              <p class="infor-desc ellipsis">
                {{ item.overview }}
              </p>
              <div class="infor-footer">
                <span class="timer"> {{ item.createdTime }}</span>
                <span class="spanBtn" @click="handleDetail(item.id)"
                  >阅读全文&nbsp;<i class="el-icon-right"  style="font-size:18px" ></i></span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="empty-wrapper" v-else>
          <el-empty description="暂无数据"></el-empty>
        </div>
      </div>

    </div>

    <div class="pageNation">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pageNum"
        :page-size="pageObj.pageSize"
        :total="pageObj.total"
      >
      </el-pagination> -->

       <el-pagination
        layout="prev, pager, next"
        :current-page="pageObj.pageNum"
        :page-size="pageObj.pageSize"
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleCurrentChange"
        :total="pageObj.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsCenter",
  layout: "BaseLayout",
  data() {
    return {
       bannerBg:require('assets/images/img-xwzxbanner.png'),
      newsImg: require("assets/images/img-jiejuefangan.png"),
      newsImg1: require("assets/images/hotNewImg.jpg"),
      newsImg2: require("assets/images/hot2.jpg"),
      bannerBg:require("assets/images/img-xwzxbanner.png"),
      currentPage: 1,
      typeList: [],
      menuId: "",
      activeIndex: 0,
      newsList: [],
      pageObj: {
        pageNum: 1,
        pageSize: 5,
        total: null,
      },
      hotList:[],
    };
  },
  async created() {
    await  this.handleGetType();
    if(this.$route.query.index===undefined){
      if(this.typeList.length>0){
        this.menuId = this.typeList[0].id;
         this.handleGetTypeLists(this.menuId,1,5);
        this.handleHotNewsLists(this.menuId);
      }
    }else{
      this.menuId=this.$route.query.menuid;
      this.pageObj.pageNum=parseInt(this.$route.query.pageNum) ;
      this.pageObj.pageSize=parseInt(this.$route.query.pageSize);
      this.activeIndex=this.$route.query.index;
      this.handleGetTypeLists(this.menuId,5);
      this.handleHotNewsLists(this.menuId);
    }
  },
  computed:{
       spliceStr(date,start,end){
         console.log(date);
        // let str=date.slice(start,end);
        // console.log(str);
        // return str;
        return date;
       },
  },
  methods: {
   //获取新闻分类
    async handleGetType(){
        this.typeList = (
        await this.$homeApi.article.handleNewsTypeOfClient()
      ).data;
    },
   //获取对应分类的列表数据
   async handleGetTypeLists(id,pageNum,pageSize){
      let dataInfor = (
        await this.$homeApi.article.handleNewsListOfClient({
          menuId: id,
          pageNum,
          pageSize
        })
      );
      this.newsList = dataInfor.rows;
      if(this.newsList.length>0){
         this.newsList.forEach(item=>{
           item.day=item.publishTime.slice(8,10);
           item.month=item.publishTime.slice(0,7);
         })
      }
      this.pageObj.total = dataInfor.total;
      console.log("总条数"+ this.pageObj.total);
   } ,
    //获取热门新闻
  async handleHotNewsLists(id){
     this.hotList = (
        await this.$homeApi.article.handleHotNewsList({
          menuId: id,
        })
      ).data;
      if(this.hotList.length>0){
           this.hotList.forEach(item=>{
             item.img=process.env.NUXT_ENV+item.img;
             item.publishTime=item.publishTime.slice(0,10);
           })
       }

   },
    //切换分类获取对应的数据
     handleChangeType(id, index) {
      console.log(id, index);
      this.menuId = id;
      this.activeIndex = index;
      this.pageObj.pageNum = 1
      this.handleGetListOfType(this.menuId,1,5)
      this.handleHotNewsLists(this.menuId);
    },
   async handleGetListOfType(menuId,pageNum,pageSize){
       this.newsList=[];
       let dataInfor = {};
       console.log(pageNum);
         dataInfor =await this.$homeApi.article.handleNewsListOfClient({
            menuId,
            pageNum,
            pageSize
          })
         this.newsList = dataInfor.rows;
         console.log(this.newsList);
          if(this.newsList.length>0){
         this.newsList.forEach(item=>{
           item.day=item.publishTime.slice(8,10);
           item.month=item.publishTime.slice(0,7);
         })
      }
         this.pageObj.total = dataInfor.total;
    },
    //跳转到详情页
    handleDetail(id) {
      this.$router.push({
        name: "newsCenterDetail",
        query: {
          menuid: this.menuId,
          index: this.activeIndex,
          pageNum:this.pageObj.pageNum,
          id,
        },
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageObj.pageSize=val;
        this.handleGetListOfType(this.menuId,this.pageObj.pageNum,this.pageObj.pageSize);
    },
    //切换页码，获取对应数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageObj.pageNum=val;
       this.handleGetListOfType(this.menuId,this.pageObj.pageNum,this.pageObj.pageSize);
    },
  },
};
</script>
<style scoped lang="scss">
.banner-bg{
  margin-top:-2px;
  position: relative;
  color:#fff;
  text-align: center;
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
    bottom:2px;
  }
  .active{
    color:#00a972;
    border-bottom: 2px solid #00a972;
  }
}
.list-content{
   padding-left: 60px;
   margin-top:60px;
}
.newsCenter {
    box-sizing: border-box;
    padding-bottom: 40px;
 .banner-bg {
     margin-bottom: 60px;
     .tagList li{
       margin-right:78px;
     }
      .tagList li:last-child{
        margin-right: 0;
      }
  }
  .news-content {

    .news-list {
      .list-content{
         margin: 0 12%;
         padding-top: 20px;
      }

      .list-item {
        display: flex;
        margin-bottom: 40px;
        .item-img {
          width: 320px;
          height: 180px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-infor {
          flex: 1;
          padding: 10px 0 10px 20px;
          .itemTitle{
            position: relative;
            border-bottom:1px solid #E6E6E6;
             padding-bottom: 11px;
              .dayTxt{
               position: absolute;
               top:-20px;
               left:-75px;
               font-size:30px;
               font-weight: bold;
               color:#00a972;
              }
              .dateTxt{
                font-size: 12px;
                color: #999999;
              }

              .viewNumTxt {
                float: right;

                .viewNum {
                  color: #00a972;
                }
              }
          }
          .infor-title {
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            color:#333333;
          }
           .infor-title:hover{
             cursor: pointer;
             color:#00a972;
           }
          .infor-desc {
            font-size: 16px;
            color: #000;
            margin-bottom: 40px;
            color:#808080;
          }
          .infor-footer {
            .timer {
              font-size: 14px;
              color: #808080;
            }
            .spanBtn {
              float: right;
              font-size: 16px;
              color: #00a972;
              text-decoration: none;
              cursor: pointer;
            }
          }
        }
      }
    }
    .line{
      height:10px;
      background: #EFF3F4;
    }
    .hotList{
      margin: 0 12%;
      display:flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .hotItem{
        flex: 0 0 46.5%;
        margin-bottom: 20px;
        max-height: 420px;
        overflow: hidden;
        img{
          width: 100%;
          height: 330px;
        }
        .newsTitle{
          font-size:18px;
          padding: 10px 5px;
          color:#333333;
          border-bottom: 1px solid #E6E6E6;
          margin-bottom: 6px;
          text-align: left;
          p{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          p:hover{
           cursor: pointer;
           color:#00a972;
          }
        }
        div{
          text-align: left;
        }
        .dateTxt{
          margin-left:20px;
          color:#808080;
          font-size:12px;
        }
      }
    }
  }
  .pageNation {
    margin: 20px 238px;
    text-align: center;
  }
}

@media screen and (min-width: 1440px) and (max-width: 1680px){
.newsCenter .banner-bg{
    .txt-box{
      .bigTxt{
      padding-top:80px;
      padding-bottom:21px;
    }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
 .newsCenter .banner-bg{
    .txt-box{
        .bigTxt{
      padding-top:60px;
      padding-bottom:21px;
    }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
 .newsCenter .banner-bg{
    .txt-box{
       .bigTxt{
          padding-top:50px;
          padding-bottom:21px;
        }
    }
  }
}
</style>

<style lang="scss" scoped>
::v-deep .el-pagination {
  .btn-next,
  .btn-prev {
    background-color: transparent;
    color: #333;
  }

  span {
    font-size: 20px !important;
  }

  .el-pager {
    .number {
      font-size: 20px;
    }
  }
}
</style>
