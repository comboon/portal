<template>
  <div class="footer" v-if="showHeader">
    <div class="footer-main">
      <div class="main-left">
        <div class="left-item">
          <ul v-if="this.dataInfor.entranceList.length>0">
            <li v-if="this.$store.state.selectedLang==='zh_CN'" style="font-size:16px;color:#FCFAFA;">快速入口</li>
            <li v-if="this.$store.state.selectedLang==='en_US'"  style="font-size:16px;color:#FCFAFA;">QuickEntry</li>
            <li v-for="(item,index) in  this.dataInfor.entranceList" :key="index" @click="handleLinkOpen(item)">{{item.footerName}}</li>
          </ul>
        </div>
        <div class="left-item">
          <ul v-if="this.dataInfor.linkList.length>0">
           <li v-if="this.$store.state.selectedLang==='zh_CN'" style="font-size:16px;color:#FCFAFA;">相关链接</li>
            <li v-if="this.$store.state.selectedLang==='en_US'" style="font-size:16px;color:#FCFAFA;">AboutLink</li>
           <li  v-for="(item,index) in  this.dataInfor.linkList" :key="index"  @click="handleLinkOpen(item)">{{item.footerName}}</li>
          </ul>
        </div>
      </div>
      <div class="main-right">
        <div class="right-item img-wrapper">
          <div v-for="(item,index) in imgList" :key="index">
            <img :src="item.imgUrl"/>
            <p>{{item.remark}}</p>
          </div>

        </div>
        <div class="right-item">
          <ul v-if="dataInfor.tel!==null">
            <li  style="font-size:16px" v-if="this.$store.state.selectedLang==='zh_CN'">联系我们</li>
            <li v-if="this.$store.state.selectedLang==='en_US'"  style="font-size:16px">Contact US</li>
            <li><i class="el-icon-phone" ></i> {{this.dataInfor.tel}}</li>
            <li><i class="el-icon-location"></i> {{this.dataInfor.loc}}</li>
            <li><i class="el-icon-message"></i> {{this.dataInfor.email}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-filing">
<!--      <span class="circular">&cope;</span>-->
<!--      <span class="f-txt">中国四川省成都市高新西区西芯大道18号 邮编：611731 蜀ICP备19007369号 </span> -->
      <span class="f-txt">&copy;邮编：611731 蜀ICP备19007369号 </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "pubFooter",
  layout: "BaseLayout",
  props: ['type'],
  serverCacheKey: props => props.type,
  data() {
    return {
      QRUrl: require("../assets/images/erweima.png"),
      dataInfor:{
         linkList:[],
         entranceList:[],
         tel:null,
         loc:null,
         email:null,
         qrcodeUrl:[],
         remark:[]
      },
     imgList:[],

    };
  },
  created(){
    this.handleGetData();
  },
  computed: {
    showHeader() {
      return !window.__POWERED_BY_QIANKUN__
    }
  },
  methods:{
      // 获取页脚数据
     async handleGetData(){

          //  if(CACHED.has('footerData')){
          //         this.dataInfor = JSON.parse(CACHED.get('footerData'));
          //         console.log("存在缓存~~~~~~~~~~~~~~~");
          //     }else{

          //  }
           let res= (await this.$homeApi.article.handleGetHomeFooterData()).data;
           if(res!==null){
             if(res.qrcodeUrl!==null){
                   let list= res.qrcodeUrl.split(',');
             list.forEach(item=>{
               let obj={
                 imgUrl:process.env.NUXT_ENV+item
               }
                this.imgList.push(obj);
             })
             }

             if(res.remark!==null){
               let reList=res.remark.split(',')
               let arr=JSON.parse(JSON.stringify(this.imgList));
               let arr2=[];
               arr.forEach((item,index)=>{
                 let obj={
                   imgUrl:item.imgUrl,
                   remark:reList[index]
                 }
                 arr2.push(obj);
               })
               this.imgList=arr2;
             }
              this.dataInfor=res;
             // CACHED.set('footerData',JSON.stringify(this.dataInfor))
           }
      },
      //点击连接，打开新窗口
      handleLinkOpen(item){
          window.open(item.url);
      }
  }
};
</script>
<style scoped lang="scss">
.footer {
  background-color: #27292b;
  width:100%;
    .footer-main {
      width: 100%;
      padding:56px 10% ;
      background-color: #2e3033;
      color: #fff;
      box-sizing: border-box;
      display: flex;
      .main-left,
      .main-right {
        flex: 1;
        display: flex;
      }
      .main-left {
        .left-item {
          flex: 1;
          ul li {
            //height: 44px;
            //line-height: 44px;
            padding-bottom: 20px;
            font-size: 14px;
            color: #B7B7B8;
            cursor: pointer;
          }
          li:last-child{
            padding-bottom: 0;
          }
        }
        .left-item:first-child{
          ul li{
            padding-left: 20px;
          }
        }
      }
      .main-right {
        .right-item {
          padding: 0 10px;
          ul li {
            //height: 44px;
            padding-bottom: 20px;
            font-size: 16px;
            cursor: pointer;
          }
          li:last-child{
            padding-bottom: 0;
          }
        }
        .right-item:first-child{
          flex: 0 0 55%;
        }

        .right-item:last-child{
          flex: 0 0 45%;
        }
        .img-wrapper {
          div{
            display: inline-block;
            width:100px;
            height:100px;
            margin-right: 19px;
            vertical-align: top;
            p{
              text-align: center;
              font-size:12px;
              margin-top:6px;
            };
          }
          text-align: right;
          padding-top: 10px;
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    .footer-filing {
      height: 75.3px;
      line-height: 75.3px;
      text-align: center;
      font-size: 13px;
      color: #cccccc;
      .circular {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
        border: 2px solid #cdcdcd;
        vertical-align: middle;
        color: #cdcdcd;
        font-size: 16px;
      }
      .f-txt{
        font-size: 15px;
        vertical-align: bottom;
      }
    }


}
</style>
