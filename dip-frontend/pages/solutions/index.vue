<template>
  <div class="solution">
    <div class="banner-bg">
      <img :src="bannerBg" alt="">
      <div class="banner-txt-box">
        <p class="bigTxt">{{ descInfor.solutionName }}</p>
        <p class="smallTxt">{{ descInfor.solutionDes }}</p>
        <el-button type="primary" class="primaryBtn" @click="handleToConsultingPage">立即咨询</el-button>
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

    <div class="content" v-if="solutiondetailCfgList.length">
      <template v-for="item of solutiondetailCfgList">
        <temp-one :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '1'"></temp-one>
        <temp-two :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '2'"></temp-two>
        <temp-three :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '3'"></temp-three>
        <temp-four :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '4'"></temp-four>
        <temp-five :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '5'"></temp-five>
        <temp-six :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '6'"></temp-six>
        <temp-seven :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '7'"></temp-seven>
        <temp-eight :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '8'"></temp-eight>
        <temp-nine :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '9'"></temp-nine>
        <temp-ten :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '10'"></temp-ten>
        <temp-eleven :id="`solutions${item.id}`" :key="item.id" type="solutions" :data="item" v-if="item.templateType === '11'"></temp-eleven>
      </template>
    </div>
  </div>
</template>
<script>
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
  name: "solution",
  layout: "BaseLayout",
  data() {
    return {
      bannerBg:require('assets/images/img-jjfabanner.png'),
      activeIndex: 0,
      list: [],
      descInfor: {},
      navList:[

      ],
      isTarget:false,
      solutiondetailCfgList: []
    };
  },
  watch:{
    $route(n,o){
        if(n.query.id != o.query.id){ //监听路由参数是否变化
        console.log("AA");
            location.reload()
        }
        console.log(n);
    }
  },
  created(){
      this.handleChange(this.$route.query.id)
  },
  methods: {
    //根据具体的id，获取解决方案的数据
    async handleChange(id) {
      this.descInfor = (
        await this.$homeApi.article.handleGetSolutionDetail(id)
      ).data;

      this.solutiondetailCfgList = this.descInfor.solutiondetailCfgList;

      this.navList = this.solutiondetailCfgList.map(item => {
        return {
          type: item.type,
          id: `solutions${item.id}`
        }
      })
    },
    //跳转到咨询页码，携带参数，提交咨询的时候提供具体的解决方案id，名称
    handleToConsultingPage(){
       let routeUrl = this.$router.resolve({
           name:"consulting",
            query:{
              id:this.descInfor.id,
              name:this.descInfor.solutionName
            }
        });
         window.open(routeUrl.href, '_blank');
    },

    navClick (id) {
      const y = document.querySelector(`#${id}`).offsetTop - 100
      window.scrollTo(0, y)
    }
  },
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
.solution {
    .content {
      padding: 0 12%;
    }
  }
.solution .banner-bg .tagList li{
  color:#fff;
}
.solution .banner-bg .tagList li:last-child{
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
