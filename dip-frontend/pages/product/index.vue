<template>
  <div class="product">
    <div class="banner-bg">
      <img :src="bannerBg" alt="">
      <div class="banner-txt-box">
        <p class="bigTxt">{{ descInfor.serviceName }}</p>
        <p class="smallTxt">{{ descInfor.serviceDes }}</p>
        <el-button type="primary" class="primaryBtn" @click="handleToMarketDetailPage">立即购买</el-button>
      </div>
        <div class="banner-footer">
               <ul class="tagList">
                  <li
                    :class="{ active: activeIndex === index }"
                    v-for="(item, index) in navList"
                    :key="item.type"
                  >
                   <a @click="navClick(item.id)"> {{ item.type }}</a>
                  </li>
                </ul>
       </div>
    </div>

    <div class="content" v-if="productservicedetailCfgList.length">
      <template v-for="item of productservicedetailCfgList">
        <temp-one :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '1'"></temp-one>
        <temp-two :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '2'"></temp-two>
        <temp-three :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '3'"></temp-three>
        <temp-four :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '4'"></temp-four>
        <temp-five :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '5'"></temp-five>
        <temp-six :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '6'"></temp-six>
        <temp-seven :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '7'"></temp-seven>
        <temp-eight :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '8'"></temp-eight>
        <temp-nine :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '9'"></temp-nine>
        <temp-ten :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '10'"></temp-ten>
        <temp-eleven :id="`product${item.id}`" :key="item.id" type="product" :data="item" v-if="item.templateType === '11'"></temp-eleven>
      </template>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";

const templateTypeMap = {
  1: 'temp-one',
  2: 'temp-two',
  3: 'temp-three',
  4: 'temp-four',
  5: 'temp-five',
  6: 'temp-six',
  7: 'temp-seven',
  8: 'temp-eight',
  9: 'temp-nine',
  10: 'temp-ten',
  11: 'temp-eleven'
}

export default {
  name: "productIndex",
  layout: "BaseLayout",
  data(){
    return {
      bannerBg:require('assets/images/img-cpffbanner.png'),
      activeIndex: 0,
      navList:[],
      descInfor:{
        serviceName:null,
        description:null,
      },
      productservicedetailCfgList: []
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
    //获取产品服务的数据
    async handleChange(id){
      this.descInfor = (
        await this.$homeApi.article.handleGetProductDetail(id)
      ).data;

      this.productservicedetailCfgList = this.descInfor.productservicedetailCfgList;

      this.navList = this.productservicedetailCfgList.map(item => {
        return {
          type: item.type,
          id: `product${item.id}`
        }
      })
    },

    handleToMarketDetailPage () {
      this.$router.push({
        path: "/applicationMarket/marketDetail",
        query: {
          id: nav.elementId
        }
      });
    },

    navClick (id) {
      const y = document.querySelector(`#${id}`).offsetTop - 100
      window.scrollTo(0, y)
    }
  }
};
</script>

<style scoped lang="scss">
.banner-bg {
  font-size: 30px;
  position: relative;
  margin-top: -2px;
  color: #fff;
    img{
        width:100%;
        height:auto
     }
   .banner-txt-box{
     position: absolute;
     top:0;
     margin-left:10%;
     padding-top:132px;
      .bigTxt{
        font-size: 32px;
        padding-bottom:31px;
    }
    .smallTxt{
        font-size: 16px;
        margin-bottom: 33px;
    }
    .primaryBtn{
      width:172px;
      font-size: 17px;
    }
   }
   .tagList{
     li{
       margin-right:78px;
       font-size: 16px;
     }
     li a{
       color: #FEFEFE;
       font-weight: 400;
       text-decoration: none;
     }
     .active{
        color: #FEFEFE;
        // border-bottom: 2px solid #00a972;
     }
     li a:hover{
       color:#02a670;
     }
   }
}
.testNav {
  li {
    display: inline-block;
    font-size: 18px;
    margin: 20px 20px;
  }
}
.box {
  height: 600px;
  margin-bottom: 20px;
  color: #fff;
  background: #02a670;
}
.product {
    .content {
      padding: 0 12%;
    }
  }
.product .banner-bg .tagList li{
  color:#fff;
}
.product .banner-bg .tagList li:last-child{
  margin-right: 0;
}
@media screen and (min-width: 1440px) and (max-width: 1690px){
.banner-bg{
    .banner-txt-box{
     margin-left:10%;
     padding-top:50px;
      .bigTxt{
        padding-top:20px;
        padding-bottom:21px;
    }
    .smallTxt{
        font-size: 16px;
        margin-bottom: 23px;
    }
    .primaryBtn{
      width:172px;
      font-size: 15px;
    }
   }
  }
.progressItem .gressContent .ulList{
  flex: 0 0 49.92%;
}
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
.banner-bg{
    .banner-txt-box{
     margin-left:10%;
     padding-top:40px;
      .bigTxt{
        padding-top:20px;
        padding-bottom:21px;
    }

    .primaryBtn{
      width:172px;
      font-size: 15px;
    }
   }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
 .banner-bg{
    .banner-txt-box{
     margin-left:10%;
     padding-top:0;
      .bigTxt{
        padding-top:40px;
        padding-bottom:21px;
    }
    .primaryBtn{
      width:172px;
      font-size: 15px;
    }
   }
  }
}
</style>
