<template>
  <div class="applicationMarket">
    <div class="banner-bg">
<!--      <img :src="bannerImg" />-->
      <div class="center-text">
        <p class="bigTxt">应用市场</p>
        <p class="smallTxt">应用市场是一个云上的软件和服务商城，您可以高效找到业务发展所需的各类产品和服务。平台精选服务商，保障服务质量。</p>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="filter-box">
        <div class="search-box">
          <el-input placeholder="请输入关键字" v-model="inputVal" class="serachInput"></el-input>
          <span class="searchBtn"  @click="handleSerach">
            <i class="el-icon-search"></i>
          </span>
        </div>

        <template v-for="item of tagList">
          <div
            class="filter-item-box"
            :key="item.id"
            v-if="serachForm.parentProductType !== '' && item.tagTypeName === '二级分类' || item.tagTypeName !== '二级分类' "
          >
            <div class="filter-label">{{ item.tagTypeName }}</div>
            <div class="filter-value">
              <ul ref="tagList">
                <li
                  v-for="(tag, index) in item.tagValues"
                  :key="index"
                >
                  <span :class="{active:item.activeIndex===index}" @click="handleChange(item, index)">{{ tag }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>

      </div>
      <div class="content-list-box">
        <div class="sort-box">
          <ul>
            <li :class="{active:activeIndex===1}">
              交易量

              <img :src="descIcon" v-if="!tradingOrderUp&&activeIndex!==1"
                   @click="handleTrand('asc')"
                   class="el-icon-bottom">
              <img :src="activeDesc" v-if="!tradingOrderUp&&activeIndex===1"   @click="handleTrand('asc')"
                   class="el-icon-bottom">


              <img :src="ascIcon" v-if="tradingOrderUp"   @click="handleTrand('desc')">
            </li>
            <li :class="{active:activeIndex===2}">
              上架时间
              <img :src="descIcon" v-if="!shelfTimeOrderUp&&activeIndex!==2"
                   @click="handleShelfTime('asc')"
                   :class="{active:activeIndex===2}">

              <img :src="activeDesc" v-if="!shelfTimeOrderUp&&activeIndex===2"   @click="handleShelfTime('asc')"
                   class="el-icon-bottom">

              <img :src="ascIcon" v-if="shelfTimeOrderUp"
                   @click="handleShelfTime('desc')">
            </li>
            <!-- <li>
              价格
              <i
                v-if="priceOrderUp"
                class="el-icon-top"
                @click="handlePriceOrder('desc')"
              ></i>
              <i
                v-if="!priceOrderUp"
                class="el-icon-bottom"
                  @click="handlePriceOrder('asc')"
              ></i>
            </li> -->
            <li class="totalLi" style="color:#000;font-size:16px">共 <span style="color:#00A972">{{ pageObj.total }}</span> 件</li>
          </ul>
        </div>
        <div class="list-content">
          <div
            class="list-item"
            v-for="(item, index) in marketList"
            :key="index"
          >
            <div class="item-img">
              <img :src="item.imageUrl" />
            </div>
            <div class="item-info">
              <div class="info-title" v-html="item.name"></div>
              <div class="info-desc" v-html="item.description">

              </div>
              <ul class="info-ul">
                <li>
                  <img :src="developersImg"/>
                  {{ item.developer }}
                </li>
                <li>
                  <img :src="industryImg" />
                  {{ item.industryType }}
                </li>
                <li>
                  <img :src="downLoadImg" />
                  {{ item.deliveryMethod }}
                </li>
              </ul>
            </div>
            <div class="item-buyType" v-if="item.purchaseType === '免费'">
              <p class="buy-free">限时免费</p>
              <p class="sales">销量:&nbsp;&nbsp;{{ item.salesVolume === null ? 0 :item.salesVolume }}</p>
              <el-button class="see-btn" @click="handleDetail(item.id)"
              >查看详情</el-button
              >
            </div>
            <div class="item-buyType" v-else >
              <!-- <p class="pay">
                ￥
                <span class="priceNum">{{ item.price }}</span>
              </p> -->
              <p class="sales" style="margin-top:44px">销量:&nbsp;&nbsp;{{ item.salesVolume === null ? 0 :item.salesVolume }}</p>
              <el-button class="see-btn" @click="handleDetail(item.id)"
              >查看详情</el-button
              >
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="pageNation">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pageNum"
        :page-sizes="[10, 15, 20]"
        :page-size="pageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageObj.total"
      >
      </el-pagination> -->

      <el-pagination
        layout="prev, pager, next"
        :current-page="pageObj.pageNum"
        :page-size="pageObj.pageSize"
        @current-change="handleCurrentChange"
        prev-text="上一页"
        next-text="下一页"
        :total="pageObj.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";

export default {
  name: "applicationMarket",
  layout: "BaseLayout",
  data() {
    return {
      inputVal: "",
      downLoadImg: require("assets/images/icon_play.svg"),
      developersImg: require("assets/images/yysc-2.svg"),
      industryImg: require("assets/images/yysc-1.svg"),


      descIcon:require("assets/images/ico-pxx.png"),
      ascIcon:require("assets/images/ico-pxsx.png"),
      activeDesc:require("assets/images/ico-pxs.png"),
      bannerImg:require("assets/images/banner-gif.gif"),
      serachForm: {
        domainType: "", //领域分类
        industryType: "", //行业分类
        deliveryMethod: "", // 交付方式
        parentProductType: "", //产品分类
        productType: "", //二级分类
        purchaseType: "", //购买方式
        keyword: "", //搜索关键字
        pageNum: 1,
        pageSize: 5,
        sortField: "", // 排序字段 priceNum-价格 salesVolume-销量 publishTime-上架时间
        sortRule: "", //asc-升序 desc-降序
      },
      tagList: [],
      marketList: [],
      pageObj: {
        pageNum: 1,
        pageSize: 5,
        total: null,
      },
      tradingOrderUp:false,   //交易量默认升序
      shelfTimeOrderUp:false,  //上架时间默认升序排序
      priceOrderUp:true,     //根据价格默认升序排序
      activeIndex:-1,
      subTags: {},
      subTag: {
        activeIndex: 0,
        tagValues: [],
        tagTypeName: '二级分类',
        tagTypeId: 1
      }
    };
  },

  async created() {
    let queryObj=this.$route.query;
    await this.handleGetData();
    if(queryObj.pageNum===undefined){
      this.handleGetLists();
    }else{
      this.pageObj.pageNum=parseInt(queryObj.pageNum);
      this.pageObj.pageSize=parseInt(queryObj.pageSize);
      this.serachForm.pageNum=parseInt(queryObj.pageNum);
      this.serachForm.pageSize=parseInt(queryObj.pageSize);
      this.handleGetLists();
    }
  },
  methods: {
    getSubTagsOfClient (type) {
      if (type === '全部') {
        return
      }

      this.$homeApi.article.handleGetSubTagsOfClient(type)
        .then(res => {
          const list = res.data
          if (!list.includes('全部')) {
            list.unshift('全部')
          }
          this.subTags[type] = list
          window.sessionStorage.setItem(`subTagsOf${type}`, JSON.stringify(list))
        })
    },

    /**
     * methods:handleGetData
     * desc: 若没有记录上一次所选中得tag， 正常获取数据，  如果有得话，需要修改每一项tag个选中
     * 状态， 同时把searchForm  对应得查询条件进行修改
     */
    async handleGetData() {
      const _tagList = (
        await this.$homeApi.article.handleGetTagsOfClient()
      ).data;

      const productTypeList = _tagList[0].tagValues
      console.log(productTypeList)
      productTypeList.forEach(item => {
        this.getSubTagsOfClient(item)
      })

      _tagList.splice(1, 0 , this.subTag)

      console.log(_tagList)

      if(this.$route.query.tags!==undefined){
        let tags=this.$route.query.tags.split(',');

        _tagList.forEach((item,index)=>{
          if (!Array.isArray(item.tagValues)) {
            item.tagValues = []
          }

          if (!item.tagValues.includes('全部')) {
            item.tagValues.unshift('全部');
          }

          console.log(item);
          for(let i = 0;i < tags.length;i++){
            if(index===i){
              item.activeIndex=parseInt(tags[i]);
              let tag=item.tagValues?.[tags[i]];
              console.log(tag);
              switch (item.tagTypeName) {
                case "费用类型":
                  tag === "全部"
                    ? this.serachForm.purchaseType = ""
                    : this.serachForm.purchaseType = tag;
                  console.log("费用类型"+this.serachForm.purchaseType);
                  break;
                case "产品分类":
                  tag === "全部"
                    ? this.serachForm.parentProductType = ""
                    : this.serachForm.parentProductType = tag;
                  if (tag) {
                    const tagValues = window.sessionStorage.getItem(`subTagsOf${tag}`)
                    this.subTag.tagValues = JSON.parse(tagValues)
                  }
                  break
                case "二级分类":
                  tag === "全部"
                    ? this.serachForm.productType = ""
                    : this.serachForm.productType = tag;
                  break;
                case "行业分类":
                  tag === "全部"
                    ? this.serachForm.industryType = ""
                    : this.serachForm.industryType = tag;
                  break;
                case "交付方式":
                  tag === "全部"
                    ? this.serachForm.deliveryMethod = ""
                    : this.serachForm.deliveryMethod = tag;
                  break;
              }
              continue;
            }
          }
        })
      } else{
        _tagList.forEach(item=>{
          item.activeIndex=0;

          if (!item.tagValues.includes('全部')) {
            item.tagValues.unshift('全部');
          }
        })
      }



      // const tagList = tagList.map(item => {
      //   item.tagValues.map(_item => {
      //     return {
      //       tag
      //     }
      //   })
      // })

      this.tagList = _tagList;
    },
    //获取列表数据
    async  handleGetLists(){
      let listData = (
        await this.$homeApi.article.handleGetMarketListOfClient(this.serachForm)
      );
      this.marketList=listData.rows;
      if( this.marketList.length>0){
        this.marketList.forEach(item=>{
          item.imageUrl=process.env.NUXT_ENV +item.imageUrl;
        })
      }
      this.pageObj.total=listData.total;
    },
    //点击切换tag 时候获取数据
    async handleChange(item, index) {
      this.serachForm.pageNum = 1
      this.serachForm.pageSize = 5
      this.pageObj.pageNum = 1;
      const typeValue = item.tagTypeName;
      item.activeIndex = index
      const tag = item.tagValues[index]

      switch (typeValue) {
        case "费用类型":
          tag === "全部"
            ? this.serachForm.purchaseType = ""
            : this.serachForm.purchaseType = tag;
          break;
        case "产品分类":
          tag === "全部"
            ? this.serachForm.parentProductType = ""
            : this.serachForm.parentProductType = tag;

          this.serachForm.productType = ''
          const subTag = this.subTags[tag] || []
          this.tagList[1].tagValues = subTag
          this.tagList[1].activeIndex = 0

          break;
        case "行业分类":
          tag === "全部"
            ? this.serachForm.industryType = ""
            : this.serachForm.industryType = tag;
          break;
        case "交付方式":
          tag === "全部"
            ? this.serachForm.deliveryMethod = ""
            : this.serachForm.deliveryMethod = tag;
          break;

        case '二级分类':
          tag === "全部"
            ? this.serachForm.productType = ""
            : this.serachForm.productType = tag;
          break;
      }

      console.log(this.serachForm)

      this.handleGetLists();
    },
    //点击搜索时候获取数据
    async handleSerach() {
      this.serachForm.keyword = this.inputVal;
      this.handleGetLists();
    },
    //点击销量，升序或者降序时候 请求对应数据
    async handleTrand(sort) {
      this.activeIndex=1;
      if(sort==='asc'){
        this.tradingOrderUp=true;
        this.shelfTimeOrderUp=false;
        this.serachForm.sortField='salesVolume';
        this.serachForm.sortRule='asc';
        this.handleGetLists();
      }else{
        this.tradingOrderUp=false;
        this.serachForm.sortField='salesVolume';
        this.serachForm.sortRule='desc';
        this.handleGetLists();
      }
    },

    //点击上架时间，升序或者降序时候 请求对应数据
    async handleShelfTime(type){
      console.log(type);
      this.activeIndex=2;
      if(type==='asc'){
        this.shelfTimeOrderUp=true;
        this.tradingOrderUp=false;
        this.serachForm.sortField='publishTime';
        this.serachForm.sortRule='asc';
        //  sortField: "", // 排序字段 priceNum-价格 salesVolume-销量 publishTime-上架时间
        this.handleGetLists();
      }else{
        this.shelfTimeOrderUp=false;
        this.serachForm.sortField='publishTime';
        this.serachForm.sortRule='desc';
        this.handleGetLists();
      }
    },
    //点击价格，升序或者降序时候 请求对应数据
    async handlePriceOrder(type){
      console.log(type);
      if(type==='asc'){
        this.priceOrderUp=true;
        this.serachForm.sortField='priceNum';
        this.serachForm.sortRule='asc';
        //  sortField: "", // 排序字段 priceNum-价格 salesVolume-销量 publishTime-上架时间
        this.handleGetLists();
      }else{
        this.priceOrderUp=false;
        this.serachForm.sortField='priceNum';
        this.serachForm.sortRule='desc';
        this.handleGetLists();
      }
    },

    //获取详情
    handleDetail(id) {
      let arr= this.handleSaveCheckedtag()
      this.$router.push({
        name: "applicationMarketDetail",
        query:{
          id,
          pageNum:this.pageObj.pageNum,
          pageSize:this.pageObj.pageSize,
          tags:arr.toString()
        }
      });

    },
    //保存选中tag
    handleSaveCheckedtag(){
      console.log(this.$refs.tagList)
      let activeTags=[];
      activeTags = this.tagList.map(item => {
        return item.activeIndex
      })
      // this.$refs.tagList.forEach(list=>{
      //   let arr=Array.from(list.children);
      //   console.log(arr);
      //   arr.forEach((li,index)=>{
      //     let lists=Array.from(li.children);
      //     lists.forEach(span=>{
      //        if(span.className==='active'){
      //          console.log(span.innerText);
      //           activeTags.push(index);
      //         }
      //     })
      //   })
      // })
      console.log(activeTags);
      return activeTags;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageObj.pageSize=val;
      this.serachForm.pageSize=val;
      this.handleGetLists();
    },
    //切换页码请求对应页码的数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageObj.pageNum=val;
      this.serachForm.pageNum=val;
      this.handleGetLists();

      const y = document.querySelector(`.content-list-box`).offsetTop
      window.scrollTo(0, y)
    },
  },
};
</script>
<style scoped lang="scss">
.applicationMarket {
  box-sizing: border-box;
  padding-bottom: 40px;
  background: #EFF3F4;

  .banner-bg {
    margin-top:-2px;
    position: relative;
    color:#fff;
    text-align: center;
    height: 526px;
    background: url("assets/images/img-yyscbanner.png") no-repeat;
    //background: url("assets/images/banner-gif.gif") no-repeat;
    background-size:  100% auto;
    //img{
    //  display: block;
    //  width:100%;
    //  height: auto;
    //}
    .center-text{
      //position: absolute;
      //width:100%;
      //top: 50%;
      //left:50%;
      //transform: translate(-50%,-50%);
    }
    //height: 526px;
    //background: url("assets/images/img-yyscbanner.png") no-repeat;
    //background: url("assets/images/banner-gif.gif") no-repeat;
    //background-size:  100% auto;
    .bigTxt{
      font-size: 32px;
      padding-top:131px;
      padding-bottom:31px;
    }
    .smallTxt{
      font-size: 16px;
    }
  }

  .content-wrapper {
    margin: 5px 12%;
    .search-box {
      position: relative;
      .searchBtn{
        position: absolute;
        top:0;
        right:0;
        height:40px;
        width:40px;
        line-height: 40px;
        background: #00a972;
        text-align: center;
        cursor: pointer;
        i{
          color:#fff;
          font-size: 20px;
        }
      }
      margin: 26px 0;
      .serach-btn {
        width: 62px;
        height: 40px;
        background: #00a972;
        color: #fff;
        font-size: 17px;
        text-align: center;
      }
    }
  }
  .filter-box {
    padding: 20px 33px;
    margin-top:21px;
    margin-bottom: 20px;
    background: #fff;
    .filter-item-box {
      display: flex;
      margin-bottom: 20px;
      .filter-label {
        //    margin:10px 10px;
        font-size: 16px;
        width: 80px;
        height: 40px;
        line-height: 40px;
        color:#333333;
        font-weight: 400;
      }
      .filter-value {
        flex: 1;
        ul {
          padding-top:6px;
          margin-left: 30px;
          li {
            display: inline-block;
            margin-right: 10px;
            font-size: 16px;
            color: #808080;
            cursor: pointer;
            vertical-align: top;
            width:122px;
            margin-bottom: 20px;
            span{
              display: inline-block;
              padding: 4px 12px;
            }
            span:hover{
              color: #00a972;
            }
          }
          .active {
            border: 1px solid #00a972;
            border-radius: 1px;
            color: #00a972;
          }
        }
      }
    }
  }
  .content-list-box {
    .list-content {
      .list-item {
        padding: 30px 40px;
        display: flex;
        margin-bottom: 20px;
        background: #fff;
        .item-img {
          flex: 0 0 130px;
          margin-right: 40px;
          img {
            width: 130px;
            height: 150px;
          }
        }
        .item-info {
          position: relative;
          //flex: 1;
          //margin-right: 40px;
          width:calc(100% - 160px - 171px);
          .info-title {
            font-size: 18px;
            font-weight: bold;
            color: #000000;
            margin-bottom: 20px;
          }
          .info-desc {
            overflow: hidden;
            text-overflow: ellipsis; /* 弹性伸缩盒子模型显示 */
            display: -webkit-box; /* 限制在一个块元素显示的文本的行数 */
            -webkit-line-clamp: 2; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-box-orient: vertical;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 20px;
            color: #B3B3B3;

          }
          .info-ul{
            position: absolute;
            bottom:2px;
            margin-top:8px;
            width:100%;
            display: flex;
            justify-content: space-between;
          }
          .info-ul li {
            // flex:0 0 28%;
            flex: 0 0 25%;
            height: 40px;
            line-height: 40px;
            // margin-right:2%;
            font-size: 14px;
            font-weight: 400;
            color: #808080;
            overflow: hidden;
            text-overflow: ellipsis; /* 弹性伸缩盒子模型显示 */
            display: -webkit-box; /* 限制在一个块元素显示的文本的行数 */
            -webkit-line-clamp: 1; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-box-orient: vertical;

            &:first-child {
              flex: 0 0 50%;
            }

            // &:first-child {
            //   width: 300px;
            //   flex:0 0 300px;
            // }

            img {
              vertical-align: middle;
              width: 14px;
              height: 14px;
              margin-bottom: 3px;
              margin-right: 9px;
            }
          }
        }
        .item-buyType {
          flex: 0 0 160px;
          text-align: right;
          .buy-free {
            font-size: 24px;
            font-weight: bold;
            font-style: italic;
            color: #fbb204;
            margin-bottom: 5px;
          }
          .pay {
            font-size: 16px;
            .priceNum {
              color: #00a972;
              font-size: 24px;
              font-weight: bold;
            }
          }
          .sales {
            color: #808080;
            font-size: 14px;
            margin-bottom: 30px;
          }
          .see-btn {
            width: 120px;
            height: 38px;
            line-height: 38px;
            font-size: 16px;
            border: 1px solid #E6E6E6;
            background: #fff;
            font-weight: 400;
            color: #333;
            margin-top:25px;
          }
        }
      }
      .list-item:hover {
        box-shadow: 0px 3px 40px 0px rgba(114, 114, 114, 0.2);
        cursor: pointer;
      }
      .list-item:hover .see-btn{
        background: #00a972;
        color:#fff;
        border:1px solid #00a972;
      }
    }
  }
  .sort-box {
    margin-top:46px;
    padding-bottom: 10px;
    margin-bottom: 32px;
    ul li {
      display: inline-block;
      font-size: 14px;
      margin-right: 30px;
      color:#333333;

      img{
        vertical-align: middle;
      }
      i {
        cursor: pointer;
      }
    }
    ul {
      .active{
        color: #00a972;
      }
    }
    .totalLi {
      float: right;
      margin-right: 0;
    }
  }
}
.pageNation {
  margin:20px 12% 0 12%;
  text-align: center;
  font-size:18px;
}
.active{
  color:#00a972;
}
@media screen and (min-width: 1921px){
  .applicationMarket  .banner-bg{
    height:567px;
  }
  .applicationMarket .content-list-box .sort-box ul .active{
    color:#00a972
  }
}
@media screen and (min-width: 1440px) and (max-width: 1680px){
  .applicationMarket {
    .banner-bg {
      height:350px;
      .bigTxt{
        padding-top:100px;
        padding-bottom:21px;
      }
    }
    .applicationMarket .content-list-box .list-content .list-item .item-info .info-ul li {
      // display: inline-block;
      height: 40px;
      line-height: 40px;
      // margin-right: 80px;
      font-size: 14px;
      font-weight: 400;
      color: #808080;

      img {
        vertical-align: middle;
        width: 28px;
        height: 22px;
      }
    }
  }
  .applicationMarket .content-list-box .list-content .list-item .item-info{
    flex: 0 0 1;
  }
  .applicationMarket .content-list-box .sort-box ul .active{
    color:#00a972
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
  .applicationMarket {
    .banner-bg {
      height:310px;
      .bigTxt{
        padding-top:90px;
        padding-bottom:21px;
      }
    }
  }
  .applicationMarket .content-list-box .list-content .list-item .item-info .info-ul li {
    // display: inline-block;
    height: 40px;
    line-height: 40px;
    // margin-right: 80px;
    font-size: 14px;
    font-weight: 400;
    color: #808080;
    img {
      vertical-align: middle;
      width: 28px;
      height: 22px;
    }
  }
  .applicationMarket .content-list-box .list-content .list-item .item-info{
    // flex: 0 0 59%;
  }
  .applicationMarket .content-list-box .sort-box .active{
    color:#00a972
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
  .applicationMarket {
    .banner-bg {
      height:266px;
      .bigTxt{
        padding-top:60px;
        padding-bottom:21px;
      }
    }

    .content-wrapper {
      margin: 5px 12%;
      .search-box {
        .serach-btn {
          width: 62px;
          height: 39px;
          background: #00a972;
          color: #fff;
          font-size: 17px;
          text-align: center;
        }
      }
    }
    .filter-box {
      padding: 20px 36px;
      background: #fff;
      margin-bottom: 20px;
      .filter-item-box {
        display: flex;
        margin-bottom: 20px;
        .filter-label {
          //    margin:10px 10px;
          font-size: 16px;
          width: 80px;
          height: 40px;
          line-height: 40px;
          color:#333333;
        }
        .filter-value {
          flex: 1;
          ul {
            margin-left: 30px;
            li {
              display: inline-block;
              font-size: 16px;
              color: #808080;
              margin-right: 10px;
              cursor: pointer;
            }
            .active {
              border: 1px solid #00a972;
              color: #00a972;
            }
          }
        }
      }
    }
    .content-list-box {
      .sort-box {
        padding-bottom: 10px;
        margin-bottom: 24px;
        ul li {
          display: inline-block;
          font-size: 14px;
          margin-right: 30px;
          i {
            cursor: pointer;
          }
        }
        .active{
          color:#00a972;
        }
        .totalLi {
          float: right;
          margin-right: 0;
        }
      }
      .list-content {
        .list-item {
          padding: 30px 40px;
          display: flex;
          margin-bottom: 20px;
          .list-item:hover {
            box-shadow: 0px 3px 40px 0px rgba(114, 114, 114, 0.2);
            cursor: pointer;
          }
          .item-img {
            margin-right: 40px;
            img {
              width: 131px;
              height: 152px;
            }
          }
          .item-info {
            position: relative;
            //flex: 1;
            //margin-right: 40px;
            width:calc(100% - 160px - 171px);
            .info-title {
              font-size: 18px;
              font-weight: bold;
              color: #000000;
            }
            .info-desc {
              font-size: 14px;
              font-weight: 400;
              word-break: break-all;

              color: #B3B3B3;
            }
            .info-ul{
              position: absolute;
              bottom:2px;
              margin-top:8px;
            }
            .info-ul li {
              // display: inline-block;
              height: 40px;
              line-height: 40px;
              // margin-right: 82px;
              font-size: 14px;
              font-weight: 400;
              color: #808080;
              img {
                vertical-align: middle;
                width: 14px;
                height: 14px;
              }
            }
          }
          .item-buyType {
            text-align: right;
            .buy-free {
              font-size: 24px;
              font-weight: bold;
              font-style: italic;
              color: #fbb204;
              margin-bottom: 5px;
            }
            .pay {
              font-size: 16px;
              .priceNum {
                color: #00a972;
                font-size: 24px;
                font-weight: bold;
              }
            }
            .sales {
              color: #808080;
              font-size: 14px;
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }
  .applicationMarket .content-list-box .list-content .list-item .item-info{
    // flex: 0 0 58%;
  }
}
.item-buyType .el-button{
  padding:  0 0;
}
</style>
<style>
.applicationMarket  .el-input__inner{
  /* height:38px !important; */
}
.applicationMarket  .el-input__inner{
  height: 40px !important;
}
.applicationMarket .el-input__inner:focus{
  border-color: #00a972;
}
.applicationMarket .el-pagination button:disabled,.el-pager li{
  background: transparent;
}
.search-box .el-input__inner{
  border:1px solid #e6e6e6 ;
  border-radius: 0;
  background: #fff;
  color: #808080;
  font-weight: 400;
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
      font-weight: 400;
    }
  }
}
</style>
