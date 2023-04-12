<template>
  <div class="aboutUS">
    <div class="banner-bg">
      <img :src="bannerBg">
      <div class="txt-box">
         <p class="bigTxt">关于我们</p>
        <p class="smallTxt">中国东方电气集团有限公司是全球最大的发电设备制造和电站工程总承包企业集团之一，发电设备产量累计超过 6 亿千瓦，已连续17年发电设备产量位居世界前列。</p>
      </div>
     <div class="banner-footer">
        <ul class="tagList">
          <li
            :class="{ active: aboutUsAcitve === 1 }"
            @click="handleChangeNav(1)"
          >
            公司介绍
          </li>
          <li
            :class="{ active: aboutUsAcitve === 2 }"
            @click="handleChangeNav(2)"
          >
            平台介绍
          </li>
          <li
            :class="{ active: aboutUsAcitve === 3 }"
            @click="handleChangeNav(3)"
          >
            平台发展历程
          </li>
        </ul>
     </div>


    </div>
    <div class="content-wrapper">
      <div
        class=""
        v-if="aboutUsAcitve === 1"
        v-html="dataInfor.companyInfo"
      ></div>
      <div
        class=""
        v-if="aboutUsAcitve === 2"
        v-html="dataInfor.platformInfo"
      ></div>
      <div class="progress-wrapper" v-if="aboutUsAcitve === 3">
        <div class="progressItem" v-for="(item,index) in dataInfor.historyCfgTypeVOList" :key="index">
              <div class="yearNum">
                <span class="numSpan">{{item.year}} </span>
                <!-- <span class="numBg"></span> -->
              </div>
            <div   v-for="(el,num) in item.historyCfgVOList" :key="el.id">
              <div class="gressContent" v-if="getPosition(el.id, 'left')">
                  <div class="ulList">
                    <div class="month">
                        {{el.month}}月
                        <div class="circle">
                          <span class="circleBg"></span>
                        </div>
                    </div>

                    <ul>
                          <li v-html="el.description" style="padding-left:20px;"></li>
                    </ul>
                  </div>
                  <div class="img-wrapper">
                      <img :src="el.img" v-if="el.img!==null && el.img!==''">
                  </div>
              </div>

              <div class="gressContent-right" v-if="getPosition(el.id, 'right')">
                  <div class="img-wrapper">
                      <img :src="el.img" v-if="el.img!==null && el.img!==''">
                  </div>
                   <div class="ulList">
                    <div class="month">
                       {{el.month}}月
                        <div class="circle">
                          <span class="circleBg"></span>
                        </div>
                    </div>
                    <ul>
                     <li v-html="el.description" style="padding-left:20px;"></li>
                    </ul>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "aboutUS",
  layout: "BaseLayout",
  data() {
    return {
      dataInfor: {
        companyInfo:null,
        platformInfo:null,
        historyCfgList:[]    //历程数组
      },
      bannerBg:require('assets/images/img-gywmbanner.png'),
      aboutUsAcitve: 1,
       img1: require("assets/images/gress1.jpg"),
       img2: require("assets/images/gress2.jpg"),
       historyCfgTypeVOList: []
    };
  },
  created() {
    this.HandleGetData();
  },
  methods: {
    getPosition (id, position) {
      const index = this.historyCfgTypeVOList.findIndex(item => item.id === id);
      switch (position) {
        case 'left':
          return index % 2 === 0
        case 'right':
          return index % 2 === 1
      }
    },

    //获取关于我们的数据
    async HandleGetData() {
      console.log("是否是客户端加载" + process.client);
      this.dataInfor = (
        await this.$homeApi.article.handleGetAboutUsOfClient()
      ).data;
      // if(this.dataInfor.historyCfgTypeVOList.length>0){
      //     this.dataInfor.historyCfgTypeVOList.forEach(item=>{
      //       if(item.historyCfgVOList.length>0){
      //          item.historyCfgVOList.forEach(i=>{
      //            if(i.img!==null && i.img!==""){
      //                i.img=process.env.NUXT_ENV+i.img
      //            }
      //          })
      //       }
      //     })
      //     console.log(this.dataInfor.historyCfgTypeVOList);
      // }

      let list = this.dataInfor.historyCfgTypeVOList;
      list.sort((a, b) => {
        return b.year - a.year;
      });

      list.forEach(item => {
        item.historyCfgVOList.forEach(i=>{
          if(i.img){
            i.img = process.env.NUXT_ENV+i.img
          }
        })

        item.historyCfgVOList.sort((a, b) => {
          return b.month - a.month;
        });
      })

      this.dataInfor.historyCfgTypeVOList = list;

      console.log(list)

      list = list.map(item => {
        return item.historyCfgVOList
      }).flat();

      console.log(list)

      this.historyCfgTypeVOList = list

    },
    //切换tab,修改选中的下标
    handleChangeNav(index) {
      this.aboutUsAcitve = index;
    },
  },
};
</script>
<style scoped lang="scss">
 .banner-bg {
      font-size:30px;
      text-align: center;
      position: relative;
      margin-top:-2px;
      color:#fff;
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
    .tagList li{
      margin-right: 78px;
    }
    .smallTxt{
        font-size: 16px;
    }
      }
      img{
        width:100%;
        height:auto
      }
       .active {
          color: #00a972;
          border-bottom: 2px solid #00a972;
        }
    }

  .aboutUS {
    .content-wrapper {
      margin: 48px auto;
      width: 100%;
      max-width: 1200px;
    }
  }
.progress-wrapper{
  margin:50px 0;
}
.progressItem{
  text-align: center;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 1px;
    background-color: #e5e5e5;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }

  .yearNum {
    margin-bottom: 30px;
  }



  .numSpan{
    display: inline-block;
    width:100px;
    height:40px;
    line-height: 40px;
    color:#fff;
    font-size:16px;
    background: #00a972;
    text-align: center;
  }
  .numBg{
    display:block;
    height:80px;
    width: 1px;
    margin: 0 auto;
    background: #e5e5e5;
  }
  .gressContent{
    display: flex;
    justify-content: space-between;
    .month{
      font-size: 18px;
      height:30px;
      line-height: 30px;
      color: #00a972;
      position: relative;
      padding-left: 8px;
      .circle{
        position: absolute;
        top:40px;
        right:-10px;
        width:17px;
        height:17px;
        border-radius: 50%;
        border:1px solid #00a972;
        text-align: center;
         line-height: 16px;
        .circleBg{
          display: inline-block;
          width:13px;
          height:13px;
          border-radius: 50%;
          background: #00a972;
        }
      }
    }
    .ulList{
      box-sizing: border-box;
      flex: 0 0 50%;
      text-align: left;
      font-size: 17px;
      padding-bottom: 50px;

      ul{
        border-top:1px solid #e5e5e5;
        width:96%;
        margin:20px auto 0 10px;
        box-sizing: border-box;
        padding-top: 20px;
      }
      ul li{
         line-height: 31px;
         padding-right:20px;
         .descStyle{
           display: inline-block;
           width:6px;
           height:6px;
           border-radius: 50%;
           background: black;
           margin:2px 2px 4px 2px;
         }
      }
    }
    .img-wrapper{
      flex: 0 0 47%;
      padding-left:30px;
      padding-top:55px;
      text-align: left;
      img{
        width:80%;
        height:80%;
      }
    }
  }
  .gressContent-right{
     display: flex;
    justify-content: space-between;

    .yearNum {
      margin-bottom: 30px;
    }

    .month{
      font-size: 18px;
      height:30px;
      line-height: 30px;
      color: #00a972;
      position: relative;
      padding-left: 12px;
      .circle{
        position: absolute;
        top:40px;
        left:-10px;
        width:17px;
        height:17px;
        border-radius: 50%;
        border:1px solid #00a972;
        text-align: center;
         line-height: 16px;
        .circleBg{
          display: inline-block;
          width:13px;
          height:13px;
          border-radius: 50%;
          background: #00a972;
        }
      }
    }
    .ulList{
      flex: 0 0 50%;
      text-align: left;
      font-size: 17px;
      box-sizing: border-box;
      padding-bottom: 50px;

      ul{
        border-top:1px solid #e5e5e5;
        width:95%;
        margin:20px auto 0 auto;
        box-sizing: border-box;
        padding-top: 20px;
      }
      ul li{
         line-height: 31px;
         padding-left:5px;
          .descStyle{
           display: inline-block;
           width:6px;
           height:6px;
           border-radius: 50%;
           background: black;
           margin:2px 2px 4px 2px;
         }
      }
    }
    .img-wrapper{
      flex: 0 0 47%;
      padding-top:55px;
      text-align: left;
       img{
        width:80%;
        height:80%;
      }
    }
  }
}

@media screen and (min-width: 1440px) and (max-width: 1680px){
.banner-bg{
  .txt-box{
    .bigTxt{
      padding-top:80px;
      padding-bottom:21px;
    }
  }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
.banner-bg{
   .txt-box{
       .bigTxt{
      padding-top:60px;
      padding-bottom:21px;
    }
   }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
 .banner-bg{
  .txt-box{
     .bigTxt{
      padding-top:50px;
      padding-bottom:21px;
    }
  }
  }
}
</style>

<style lang="scss">
.aboutUS {
  .content-wrapper {
    &>div {
      &>p {
        &>span {
          &>img {
            width: 100% !important;
            height: auto !important;
          }
        }
      }
    }
  }
}
</style>
