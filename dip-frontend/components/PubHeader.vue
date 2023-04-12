<template>
  <div class="navBar-header" v-if="view&&showHeader">
    <div class="wrapper">
      <div class="log-wrapper" :class="{enLog: langValue==='English'}">
        <img :src="logoUrl" class="logoImg"/>
      </div>

      <div class="nav-wrapper">
        <ul class="navBar-ul" v-if="this.$store.state.selectedLang==='zh_CN'">
          <li>
            <!-- <nuxt-link to="/">首页</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 1 || headNavIndex === 1}"
              @click="changeNav(1, 'index')"
              @mouseenter="handleNavHover(1)"
              @mouseleave="headNavIndex=-1"
            >
              首页
            </div>
          </li>
          <li @mouseleave="tryHideDialog">
            <!-- <span @click="changePage('productService')" style="color:#fff">产品服务</span> -->
            <div
              class="nav-item"
              :class="{ activeNav:headNavIndex === 2 || $store.state.headNavIndex === 2 }"

              @mouseenter="handleShowDialog($event,'product',2)"
              @mouseleave="headNavIndex=-1"
            >
              产品服务
              <i class="el-icon-caret-bottom u-caret-bottom" style="font-size:14px"></i>
            </div>
          </li>
          <li @mouseleave="tryHideDialog">
            <!-- <nuxt-link to="/login" >解决方案</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:headNavIndex === 3 || $store.state.headNavIndex === 3 }"
              @mouseleave="headNavIndex=-1"
              @mouseenter="handleShowDialog($event,'solution',3)"
            >
              解决方案
              <i class="el-icon-caret-bottom u-caret-bottom" style="font-size:14px"></i>
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/applicationMarket">应用市场</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 4 || headNavIndex === 4}"
              @click="changeNav(4, 'applicationMarket')"
              @mouseenter="handleNavHover(4)"
              @mouseleave="headNavIndex=-1"
            >
              应用市场
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/newsCenter">新闻中心</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav: $store.state.headNavIndex=== 5 || headNavIndex === 5}"
              @click="changeNav(5, 'newsCenter')"
              @mouseenter="handleNavHover(5)"
              @mouseleave="headNavIndex=-1"
            >
              新闻中心
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/aboutUs">关于我们</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 6 || headNavIndex === 6 }"
              @click="changeNav(6, 'aboutUs')"
              @mouseenter="handleNavHover(6)"
              @mouseleave="headNavIndex=-1"
            >
              关于我们
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/helpCenter">帮助中心</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav: $store.state.headNavIndex=== 7 || headNavIndex === 7}"
              @click="changeNav(7, 'helpCenter')"
              @mouseenter="handleNavHover(7)"
              @mouseleave="headNavIndex=-1"
            >
              帮助中心
            </div>
          </li>
        </ul>

        <ul class="navBar-ul" v-if="this.$store.state.selectedLang==='en_US'">
          <li>
            <!-- <nuxt-link to="/">首页</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 1 || headNavIndex === 1}"
              @click="changeNav(1, 'index')"
              @mouseenter="handleNavHover(1)"
              @mouseleave="headNavIndex=-1"
            >
              Home
            </div>
          </li>
          <li>
            <!-- <span @click="changePage('productService')" style="color:#fff">产品服务</span> -->
            <div
              class="nav-item"
              :class="{ activeNav: headNavIndex === 2  || $store.state.headNavIndex === 2 }"

              @mouseenter="handleShowDialog($event,'product',2)"
              @mouseleave="headNavIndex=-1"
            >
              ProductService
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/login" >解决方案</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav: headNavIndex === 3 || $store.state.headNavIndex === 3 }"
              @mouseleave="headNavIndex=-1"
              @mouseenter="handleShowDialog($event,'solution',3)"
            >
              Solutions
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/applicationMarket">应用市场</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 4 || headNavIndex === 4}"
              @click="changeNav(4, 'applicationMarket')"
              @mouseenter="handleNavHover(4)"
              @mouseleave="headNavIndex=-1"
            >
              ApplictionMarket
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/newsCenter">新闻中心</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 5 || headNavIndex === 5}"
              @click="changeNav(5, 'newsCenter')"
              @mouseenter="handleNavHover(5)"
              @mouseleave="headNavIndex=-1"
            >
              News
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/aboutUs">关于我们</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav: $store.state.headNavIndex === 6 || headNavIndex === 6}"
              @click="changeNav(6, 'aboutUs')"
              @mouseenter="handleNavHover(6)"
              @mouseleave="headNavIndex=-1"
            >
              About
            </div>
          </li>
          <li>
            <!-- <nuxt-link to="/helpCenter">帮助中心</nuxt-link> -->
            <div
              class="nav-item"
              :class="{ activeNav:$store.state.headNavIndex === 7 || headNavIndex === 7 }"
              @click="changeNav(7, 'helpCenter')"
              @mouseenter="handleNavHover(7)"
              @mouseleave="headNavIndex=-1"
            >
              Help
            </div>
          </li>
        </ul>
      </div>

      <div class="user-wrapper">
        <div class="user-wrapper-item">
          <span class="lang-txt console" v-show="!userInfo.adminControl && !userInfo.userControl" @click="handleLoginPage">
<!--             企业控制台-->
          </span>
          <span class="lang-txt console" v-show="userInfo.adminControl" @click="handlerGoPage(userInfo.adminControlUrl)">
             业务运营台
          </span>
          <span class="lang-txt console" v-show="userInfo.userControl" @click="handlerGoPage(userInfo.userControlUrl)">
             用户控制台
          </span>
        </div>
        <div class="user-wrapper-item">
          <div class="langBox" @mouseleave="tryHideDialog">

            <!-- <span class="left-line"></span> -->

            <span class="lang-txt" @mouseenter="handleshowLang()">
              <img :src="langICon">
              {{ langValue }}
              <i class="el-icon-caret-bottom u-caret-bottom" style="font-size:14px"></i>
            </span>
            <!-- <span class="right-line"></span> -->

            <div class="langSelect" v-if="showLangBox" @mouseenter="isLangBoxEnter = true"
                 @mouseleave="showLangBox=false; isLangBoxEnter = false">
              <ul>
                <li v-for="(lang,index) in langList" :key="index" @click="handlechangeLangType(lang)">{{ lang.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="user-wrapper-item">
          <span class="user-info-wapper" v-if="userInfo.nickname && this.$store.state.selectedLang==='zh_CN' "
                @mouseenter="handleShowUserDialog">
          <img :src="userImg" alt="">
            <span class="u-name">
              <span class="u-txt" @mouseenter="showUserInfor = false">{{ userInfo.nickname }}</span>
              <i
                class="el-icon-caret-bottom u-caret-bottom"
                @mouseenter="showUserInfor = true"
              ></i>
              <ul
                class="userDialog"
                v-if="showUserInfor"
                @mouseleave="showUserInfor = false"
              >
                <!-- <li @click="handleToMyApply">我的申请</li> -->
                <li @click="handleToUserCenter">个人中心</li>
                <li @click="logOut">退出登录</li>
              </ul>
            </span>
          </span>

<!--          <el-button type="primary" class="loginBtn" v-if="!getUserName && this.$store.state.selectedLang==='zh_CN' "-->
<!--                     @click="handleLoginPage">立即登录-->
<!--          </el-button>-->
          <el-button type="primary" class="loginBtn" v-if="!userInfo.nickname && this.$store.state.selectedLang==='zh_CN' "
                     @click="handleLoginPage">立即登录
          </el-button>

          <span class="user-info-wapper" v-if="userInfo.nickname && this.$store.state.selectedLang==='en_US' "
                @mouseenter="handleShowUserDialog">
          <img :src="userImg" alt="">
            <span class="u-name">
              <span class="u-txt" @mouseenter="showUserInfor = false">{{ userInfo.nickname }}</span>
              <i
                class="el-icon-caret-bottom u-caret-bottom"
                @mouseenter="showUserInfor = true"
              ></i>
              <ul
                class="userDialog"
                v-if="showUserInfor"
                @mouseleave="showUserInfor = false"
              >
                <!-- <li @click="handleToMyApply">我的申请</li> -->
                <li @click="handleToUserCenter">UserCenter</li>
                <li @click="logOut">LogOut</li>
              </ul>
            </span>
          </span>
          <!-- <span class="loginBtn"  @click="handleLoginPage" style="color:#999">Login</span> -->
          <el-button type="primary" class="loginBtn" v-if="!userInfo.nickname && this.$store.state.selectedLang==='en_US'"
                     @click="handleLoginPage">Login
          </el-button>
        </div>


      </div>
    </div>

    <div

      class="navDialog"
      :class="{isActive:showNavDialog,isLeave:!showNavDialog}"
      @mouseenter="isNavDialogEnter = true"
      @mouseleave="showNavDialog=false; isNavDialogEnter = false; currentTab = '0'"
    >
      <!-- <div

        class="navDialog isActive"
      > -->

      <i class="el-icon-caret-top caretTop" :style="{left:offsetNum}"></i>
      <div class="nav-wrapper">
        <el-tabs v-model="currentTab" tab-position="left" style="height: auto; min-height: 360px;">
          <el-tab-pane v-for="(item, index) of navList" :key="item.id" :name="`${index}`">
            <template #label>
              <div class="tab-label" @mouseenter="currentTab = `${index}`">
                <div class="tab-image" v-if="item.icon">
                  <el-image :src="showImg(item.icon)"/>
                </div>
                <span>{{ item.menuName }}</span>
              </div>
            </template>

            <template>
              <template v-if="isHoverSoultion">
                <div class="tab-content-box" v-for="(_item) of item.voList" :key="_item.id">
                  <div class="tab-content-item">
                    <span class="tab-content-item-inner"
                          @click="handleToDetailPage('solution', _item)">{{ _item.solutionName }}</span>
                    <span v-show="_item.tag === 2" class="tag hot">HOT</span>
                    <span v-show="_item.tag === 3" class="tag new">NEW</span>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="tab-content-box" v-for="(_item) of item.typeVOList" :key="_item.id">
                  <div class="tab-content-box-label">
                    <div class="tab-image">
                      <el-image v-if="item.icon" :src="showImg(_item.icon)"/>
                    </div>
                    <div class="tab-content-box-label-box">
                      <div class="tab-content-box-label-box-text">{{ _item.menuName }}</div>
                    </div>
                  </div>
                  <div class="tab-content-item" v-for="__item of _item.voList" :key="__item.id">
                    <span class="tab-content-item-inner"
                          @click="handleToDetailPage('product', __item)">{{ __item.serviceName }}</span>
                    <span v-show="__item.tag === 2" class="tag hot">HOT</span>
                    <span v-show="__item.tag === 3" class="tag new">NEW</span>
                  </div>
                </div>
              </template>
            </template>
          </el-tab-pane>
        </el-tabs>
        <!-- <div
          class="nav-list-item"
          v-for="(item, index) in navList"
          :key="index"
        >
          <p class="nav-list-item-title"  v-if="index%3===0">

             <img :src="appliNavIcon"/>
              {{ item.menuName }}

          </p>
          <p class="nav-list-item-title"  v-if="index%3===1">

             <img :src="appliNavIcon1"/>
              {{ item.menuName }}

          </p>
          <p class="nav-list-item-title"  v-if="index%3===2">

             <img :src="appliNavIcon2"/>
              {{ item.menuName }}

          </p>
          <ul>
            <li v-for="(nav, index) in item.voList" :key="index">
              <span
                v-if="nav.serviceName !== undefined"
                @click="handleToDetailPage('product',nav)"
              >
                {{ nav.serviceName }}</span
              >
              <span
                v-else
                @click="handleToDetailPage('solution',nav)"
                >{{ nav.solutionName }}</span
              >
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";

let timer = null;
export default {
  name: "pubHeader",
  // computed: {
  //   getUserName() {
  //     return this.$store.state.userInfor.nickname;
  //   },
  // },
  data() {
    return {
      //默认查看所有内容
      view:true,
      showLangBox: false,
      isHoverSoultion: false,
      userInfo: {},
      logoUrl: require("../assets/images/logo.png"),
      navList: [],
      langValue: "简体中文",
      appliNavIcon: require("assets/images/ico-bycp.svg"),
      appliNavIcon1: require("assets/images/ico-cp-pt.svg"),
      appliNavIcon2: require("assets/images/ico-cp-yy.svg"),
      userImg: require("assets/images/ico-yh.png"),
      langList: [
        {label: "简体中文", value: "zh_CN"},
        {label: "English", value: "en_US"},
      ],
      langICon: require("assets/images/ico-yy.png"),
      showNavDialog: false,
      showUserInfor: false, //是否展示用户中心内容
      menuVOList: [], //导航上产品服务分类集合
      solutionTypeVOS: [], // 导航上解决方案分类集合
      headNavIndex: -1,
      offsetNum: 0,
      langBoxWidth: 160,
      currentTab: '',
      isNavDialogEnter: false
    };
  },
  created() {
    console.log(1212,)
    this.queryObj = this.$route.query;
    if(this.queryObj.view){
      this.view=false;
    }
    //查看缓存中是否记录用户的切换语言，有就使用上次的，没有就默认中文
    let langType = Cookies.get('langType');
    if (langType !== undefined) {
      langType === 'zh_CN' ? this.langValue = "简体中文" : this.langValue = "English";
    } else {
      this.langValue = "简体中文"
    }

    this.handleGetHomeData();
    this.getUserType();
  },
  computed: {
    showHeader() {
      return !window.__POWERED_BY_QIANKUN__
    }
  },
  methods: {
    //获取用户
    getUserType() {
      if (Cookies.get("userInfor") !== undefined) {
        let userInfo = JSON.parse(Cookies.get("userInfor"));
        this.userInfo = userInfo
      }

    },
    async handlerGoPage(url) {

      await this.$homeApi.article.getTenantApply();

      let targetWindow = ''
// 
      targetWindow =  window.open(url + '/overallLoading') 

      // targetWindow = window.open('http://10.70.4.6:8801')

      // let data = {
      //   AUTH_TOKEN: localStorage.getItem('AUTH_TOKEN'),
      //   REFRESH_TOKEN: localStorage.getItem('REFRESH_TOKEN'),
      //   type:'isLogin'
      // }
      //
      // window.addEventListener('message', function (event) {
      //   if(event.data == 'login'){
      //     targetWindow.postMessage(data, '*')
      //   }
      // },false)
    },
    tryHideDialog() {
      timer = setTimeout(() => {
        if (this.isNavDialogEnter || this.isLangBoxEnter) {
          return
        }
        this.showNavDialog = false;
        this.showLangBox = false;
        clearTimeout(timer);
      }, 100);
    },
    showImg(src) {
      return process.env.NUXT_ENV + src
    },
    //跳转到用户中心
    handleToUserCenter() {
      this.$router.push({
        name: "userInfo",
      });
      Cookies.set("headNavIndex", -1);
      this.$store.commit("setNavIndex", -1);
    },
    /**
     * method : changeNav
     * params: index 切换选择的下标，  routerName 产品服务和解决方案 默认不跳转页面
     * desc ： 切换选项的时候要修改index 下标， 防止刷新页面默认选择首页
     */
    changeNav(index, routerName) {
      this.showNavDialog = false;
      if (routerName !== "product" && routerName !== "solutions") {
        this.$router.push({
          name: routerName,
        });
      }
    },
    //获取header需要用到的数据
    async handleGetHomeData() {
      Cookies.remove('menuVOList', []);
      Cookies.remove('solutionTypeVOS', []);
      let resData = (await this.$homeApi.article.handleGetHomeDataOfClient()).data;
      this.menuVOList = resData.menuVOList;
      console.log(this.menuVOList)
      this.solutionTypeVOS = resData.solutionTypeVOS; // 解决方案分类集合
      console.log(this.solutionTypeVOS)
    },
    /**
     * methods:handleShowDialog
     * params:type 分类  展示具体的二级导航
     */
    handleShowDialog(event, type, index) {
      clearTimeout(timer);
      this.headNavIndex = index;
      this.offsetNum = event.target.offsetLeft + 20 + "px";
      if (type === "product") {
        this.navList = this.menuVOList;
        this.showNavDialog = true;
        this.isHoverSoultion = false;
      } else {
        this.navList = this.solutionTypeVOS;
        this.showNavDialog = true;
        this.isHoverSoultion = true;
      }
    },
    //切换语言
    handlechangeLangType(lang) {
      if (this.langValue !== lang.label) {
        this.langValue = lang.label;
        this.showLangBox = false;
        this.$store.commit('setLangType', lang.value)
        Cookies.set('langType', lang.value);
        this.$router.go(0)
      }
    },
    //点击登录前往登录页
    handleLoginPage() {
      this.$router.push({
        name: "login"
      })
    },
    //退出登录，清楚cookie信息
    logOut() {
      // Cookies.remove("headNavIndex");
      // Cookies.remove("helpActiveIndex");
      // Cookies.remove("token");
      // Cookies.remove("userInfor");
      // Cookies.remove("activeList");
      // Cookies.remove("solutionTypeVOS");
      // Cookies.remove("menuVOList");

      const cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      window.localStorage.clear()

      this.$router.push({
        name: "login",
      });
    },
    //跳转到我的申请
    handleToMyApply() {
      Cookies.set("headNavIndex", -1);
      this.$store.commit("setNavIndex", -1);
      this.$router.push({
        path: "/userCenter/",
      });
    },
    //跳转到对应的解决方案 或者产品服务页
    handleToDetailPage(type, nav) {
      if (type === "solution") {
        if (nav.showType === 0) {
          this.$router.push({
            path: "/applicationMarket/detail",
            query: {
              id: nav.elementId
            }
          });
        } else if (nav.showType === 1) {
          this.$router.push({
            name: "solutions",
            query: {
              id: nav.id
            }
          });
        } else {
          window.open(nav.outUrl);
        }


      } else {
        if (nav.showType === 0) {
          this.$router.push({
            path: "/applicationMarket/detail",
            query: {
              id: nav.elementId
            }
          });
        } else if (nav.showType === 1) {
          this.$router.push({
            name: "product",
            query: {
              id: nav.id
            }
          });
        } else {
          window.open(nav.outUrl);
        }
      }
      this.showNavDialog = false;
    },
    handleshowLang() {
      this.showLangBox = true;
      this.showUserInfor = false;
      // this.isLangBoxEnter = true
    },
    handleShowUserDialog() {
      this.showLangBox = false;
    },
    handleNavHover(index) {
      this.showNavDialog = false;
      this.headNavIndex = index;
      this.showLangBox = false;
      this.showUserInfor = false;
    }
  },
  watch: {
    isHoverSoultion() {
      this.currentTab = '0'
    }
  }
};
</script>
<style scoped lang="scss">
.navBar-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;

  .wrapper {
    background: #31313b;
    display: flex;
    height: 98px;
    align-items: center;
    justify-content: space-between;

    .log-wrapper {
      flex: 0 0 16%;
      margin-left: 2%;

      .logoImg {
        width: 183px;
        height: 38px;
        display: block;
        margin: 30px auto;
      }
    }

    .nav-wrapper {
      flex: 1;
      height: 100%;

      .navBar-ul {
        list-style: none;
        height: 100%;

        li {
          height: 100%;
          display: inline-flex;
          align-items: center;
          font-size: 16px;
          font-weight: 400;
          padding: 0 20.5px;
          text-align: center;
          cursor: pointer;

          .nav-item {
            color: #ffffff;
            text-decoration: none;
          }

          .activeNav {
            color: #02a670;
            font-weight: 400;
            text-decoration: none;
          }
        }
      }
    }

    .user-wrapper {
      flex: 0 0 480px;
      height: 100%;
      display: flex;

      &-item {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .checkBox {
        display: inline-block;
        width: 77px;
        font-size: 14px;
      }

      .user-info-wapper {
        display: inline-block;
        height: 26px;
        line-height: 26px;
        color: white;
        vertical-align: middle;
        margin: 3px 15px 5px 15px;

        img {
          vertical-align: middle;
        }

        .u-name {
          position: relative;
          vertical-align: top;
          margin-left: 7px;
          font-size: 16px;

          .u-txt {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
            width: 80px;
            vertical-align: middle;
          }

          .userDialog {
            position: absolute;
            right: 0;
            top: 30px;
            background: #3F3F4C;
            padding: 20px 0;
            border-radius: 5px;
            width: 105px;

            li {
              height: 40px;
              line-height: 40px;
              padding: 0 20px;
              cursor: pointer;
              color: #999;
            }

            li:hover {
              color: #FFF;
            }
          }
        }
      }

      .userIcon {
        font-size: 26px;
        margin: 0 5px;
      }


      .console {
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        margin-right: 30px;

        &:hover {
          color: #02a670;
        }
      }
    }
  }

  .langBox {
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    height: 30px;
    padding: 0 30px;
    //border-left: 1px solid #6A6A80;
    //border-right: 1px solid #6A6A80;

    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 8px;
    }

    .lang-txt {
      font-size: 16px;
      color: #999;
      display: flex;
      align-items: center;

      span {
        cursor: pointer;
      }
    }


    .left-line {
      display: inline-block;
      height: 30px;
      width: 1px;
      background: #6A6A80;
      vertical-align: middle;
      margin-right: 30px;
      margin-left: 30px;
    }

    .right-line {
      display: inline-block;
      height: 30px;
      width: 1px;
      background: #6A6A80;
      vertical-align: middle;
      margin-left: 31px;
    }

    .langSelect {
      position: absolute;
      line-height: 40px;
      background: #3F3F4C;
      width: 140px;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      color: #999;
      border-radius: 5px;

      ul li {
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }

      ul li:hover {
        color: #fff;
      }
    }
  }

  .nav-list-item-title {
    img {
      width: 28px;
      height: 28px;
      color: #333333;
      vertical-align: middle;
    }
  }

  .navDialog {
    position: relative;
    transform: translateY(100%);
    display: none;

    .nav-wrapper {
      width: 1280px;
      margin: 0 auto;
    }

    .caretTop {
      position: absolute;
      top: -13px;
      left: 0;
      font-size: 20px;
      color: #fff;
    }
  }

  .isActive {
    display: block;
    animation: handleActive .3s linear;
    animation-fill-mode: forwards;
  }

  @keyframes handleActive {
    0% {
      transform: translateY(20%);
      opacity: .25;

    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .isLeave {
    animation: handleLeave .3s linear;
    animation-fill-mode: forwards;
    display: none;
  }

  @keyframes handleLeave {
    //0%{
    //  transform: translateY(20%);
    //  opacity: 1;
    //   display: block;
    //}
    ////25%{
    ////  transform: translateY(25%);
    ////    opacity: .725;
    ////}
    ////50%{
    ////   transform: translateY(50%);
    ////}
    ////75%{
    ////   transform: translateY(75%);
    ////     opacity: .5;
    ////}
    //100%{
    //   transform: translateY(100%);
    //    opacity: 0;
    //    height: 0;
    //    padding: 0 0;
    //}
  }

  .loginBtn {
    height: 30px;
    padding: 0 20px;
    line-height: 30px;
    vertical-align: middle;
  }

  @media screen and (min-width: 1920px) {
    .wrapper {
      .log-wrapper {
        flex: 0 0 18%;
        // margin-left: 6%;
        .logoImg {
          width: 150px;
          height: 38px;
          display: block;
          margin-top: 30px;
        }
      }

      .nav-wrapper {
        .navBar-ul li {
          font-size: 16px;
          padding: 0 17.5px;
        }
      }

      .user-wrapper {
        flex: 0 0 29%;

        .user-info-wapper {
          height: 20px;
          line-height: 20px;
          margin: 3px 15px 5px 15px;

          .u-name {
            position: relative;
            vertical-align: top;
            margin-left: 7px;
            font-size: 16px;
            color: #999;
          }
        }

        .userIcon {
          font-size: 24px;
          margin: 0 3px;
        }

        .loginBtn {
          display: inline-block;
          margin-left: 20px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .navDialog {
      padding: 40px 0;
      background: #FFF;
      z-index: 1000;

      .nav-wrapper {
        color: #808080;

        .nav-list-item {
          width: 759px;
          margin-bottom: 45px;
          padding-left: 20px;
        }

        .nav-list-item ul {
          padding-left: 34px;
        }

        .nav-list-item ul li {
          display: inline-block;
          height: 18px;
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 42px;
          margin-right: 52px;
          cursor: pointer;
        }

        .nav-list-item ul li span:hover {
          color: #00a972;
          border-bottom: 1px solid #02a670;
        }

        .nav-list-item-title {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
    .sulutionDialog {
      padding: 36px 0 47px 30.5%;
    }
    .enDialog {
      padding: 40px 0 40px 33%;
    }
    .enProDailog {
      padding: 36px 0 47px 27%;
    }
  }

  @media screen and (min-width: 1680px) and (max-width: 1920px) {
    .wrapper {
      .log-wrapper {
        flex: 0 0 18%;
        // margin-left: 6%;
        .logoImg {
          width: 150px;
          height: 38px;
          display: block;
          margin-top: 30px;
        }
      }

      .nav-wrapper {
        .navBar-ul li {
          font-size: 16px;
          padding: 0 17.5px;
        }
      }

      .user-wrapper {
        flex: 0 0 550px;

        .user-info-wapper {
          height: 20px;
          line-height: 20px;
          margin: 3px 15px 5px 15px;

          .u-name {
            position: relative;
            vertical-align: top;
            margin-left: 7px;
            font-size: 16px;
            color: #999;
          }
        }

        .userIcon {
          font-size: 24px;
          margin: 0 3px;
        }

        .loginBtn {
          display: inline-block;
          margin-left: 20px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .navDialog {
      padding: 40px 0;
      background: #FFF;
      z-index: 1000;

      .nav-wrapper {
        color: #808080;

        .nav-list-item {
          width: 759px;
          margin-bottom: 45px;
          padding-left: 20px;
        }

        .nav-list-item ul {
          padding-left: 34px;
        }

        .nav-list-item ul li {
          display: inline-block;
          height: 18px;
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 42px;
          margin-right: 52px;
          cursor: pointer;
        }

        .nav-list-item ul li span:hover {
          color: #00a972;
          border-bottom: 1px solid #02a670;
        }

        .nav-list-item-title {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
    .sulutionDialog {
      padding: 36px 0 47px 33%;
    }
    .enDialog {
      padding: 40px 0 40px 36%;
    }
    .enProDailog {
      padding: 36px 0 47px 28%;
    }
    .langSelect {
      width: 173px;
    }
  }

  @media screen and (min-width: 1440px) and (max-width: 1680px) {
    .wrapper {
      .log-wrapper {
        // margin-left: 6%;
        margin-right: 0;
        flex: 0 0 13%;

        .logoImg {
          width: 140px;
          height: 32px;
          display: block;
          margin-top: 33px;
        }
      }

      .enLog {
        margin-left: 4.5%;
      }

      .nav-wrapper {
        .navBar-ul li {
          font-size: 16px;
          padding: 0 18px;
        }
      }

      .user-wrapper {
        .console {
          margin-right: 12px;
        }

        .user-info-wapper {
          height: 20px;
          line-height: 20px;
          margin: 3px 15px 5px 15px;

          .u-name {
            position: relative;
            vertical-align: top;
            margin-left: 7px;
            font-size: 16px;
            color: #999;
          }
        }

        .userIcon {
          font-size: 24px;
          margin: 0 3px;
        }

        .loginBtn {
          display: inline-block;
          margin-left: 20px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .navDialog {
      padding: 40px 0;
      background: #fff;

      .nav-wrapper {
        color: #808080;

        .nav-list-item ul {
          padding-left: 34px;
        }

        .nav-list-item {
          width: 759px;
          margin-bottom: 24px;
          padding-left: 20px;
        }

        .nav-list-item ul li {
          display: inline-block;
          height: 18px;
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 42px;
          margin-right: 52px;
          cursor: pointer;
        }

        .nav-list-item ul li span:hover {
          color: #00a972;
          border-bottom: 1px solid #02a670;
        }

        .nav-list-item-title {
          color: #333333;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .sulutionDialog {
      padding: 40px 0 40px 30%;
    }
    .enDialog {
      padding: 40px 0 40px 33%;
    }
    .enProDailog {
      padding: 36px 0 47px 23%;
    }
    .langBox {
      // margin-right:14px;
      // margin-left: 14px;
      padding: 0 14px;
      // margin-left:15px;
    }

    .langSelect {
      width: 140px;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1440px) {
    .wrapper {
      .log-wrapper {
        // margin-left: 5%;
        // margin-right: 2%;
        .logoImg {
          width: 140px;
          height: 32px;
          display: block;
          margin-top: 33px;
        }
      }

      .nav-wrapper {
        .navBar-ul li {
          font-size: 16px;
          padding: 0 16px;
        }
      }

      .user-wrapper {
        margin-left: 0;
        flex: 0 0 26%;

        .console {
          margin-right: 12px;
          font-size: 14px;
        }

        .user-info-wapper {
          height: 20px;
          line-height: 20px;
          margin: 3px 15px 5px 15px;

          .u-name {
            position: relative;
            vertical-align: top;
            margin-left: 7px;
            font-size: 14px;
            color: #999;
          }
        }

        .userIcon {
          font-size: 22px;
          margin: 0 3px;
        }

        .loginBtn {
          display: inline-block;
          margin-left: 20px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .navDialog {
      padding: 40px 0;
      background: #fff;

      .nav-wrapper {
        color: #808080;

        .nav-list-item ul {
          padding-left: 34px;
        }

        .nav-list-item {
          width: 759px;
          margin-bottom: 18px;
          padding-left: 20px;
        }

        .nav-list-item ul li {
          display: inline-block;
          height: 18px;
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 42px;
          margin-right: 52px;
          cursor: pointer;
        }

        .nav-list-item ul li span:hover {
          color: #00a972;
          border-bottom: 1px solid #02a670;
        }

        .nav-list-item-title {
          color: #333333;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .sulutionDialog {
      padding: 40px 0 40px 34%;
    }
    .enDialog {
      padding: 40px 0 40px 39%;
    }
    .enProDailog {
      padding: 36px 0 47px 28%;
    }
    .langBox {
      //padding: 0 12px;
    }

    .console {
      margin-right: 12px;
    }
  }
  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    .wrapper {
      .log-wrapper {
        flex: 0 0 16%;
        // margin-left: 5%;
        margin-right: 2%;

        .logoImg {
          width: 140px;
          height: 30px;
          display: block;
          margin-top: 36px;
        }
      }

      .enLog {
        margin-left: 2.5%;
      }

      .nav-wrapper {
        .navBar-ul li {
          font-size: 14px;
          padding: 0 10px;
        }
      }

      .user-wrapper {
        flex: 0 0 480px;
        margin-left: 0;

        .console {
          margin-right: 12px;
          font-size: 14px;
        }

        .checkBox {
          width: 77px;
          font-size: 14px;
        }

        .user-info-wapper {
          height: 20px;
          line-height: 20px;
          margin: 3px 15px 5px 15px;

          .u-name {
            position: relative;
            vertical-align: top;
            margin-left: 7px;
            font-size: 14px;
            color: #999;
          }
        }

        .userIcon {
          font-size: 22px;
          margin: 0 3px;
        }

        .loginBtn {
          display: inline-block;
          margin-left: 20px;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .navDialog {
      padding: 40px 0;
      background: #fff;

      .nav-wrapper {
        color: #808080;

        .nav-list-item ul {
          padding-left: 34px;
        }

        .nav-list-item {
          width: 759px;
          margin-bottom: 15px;
          padding-left: 20px;
        }

        .nav-list-item ul li {
          display: inline-block;
          height: 18px;
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 42px;
          margin-right: 52px;
          cursor: pointer;
        }

        .nav-list-item ul li span:hover {
          color: #00a972;
          border-bottom: 1px solid #02a670;
        }

        .nav-list-item-title {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .sulutionDialog {
      padding: 40px 0 40px 32%;
    }
    .enDialog {
      padding: 40px 0 40px 35%;
    }
    .enProDailog {
      padding: 36px 0 47px 24.5%;
    }
    .langBox {
      //padding: 0 12px;
    }

    .langBox .lang-txt {
      font-size: 14px;
    }
    .langSelect {
      width: 130px;
    }
  }
}
</style>
<style>
@media screen and (min-width: 1680px) and (max-width: 1920px) {
  .navBar-header .el-input__inner {
    height: 24px !important;
    line-height: 24px !important;
  }
}

@media screen and (min-width: 1440px) and (max-width: 1680px) {
  .navBar-header .el-input__inner {
    height: 23px !important;
    line-height: 23px !important;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .navBar-header .el-input__inner {
    height: 22px !important;
    line-height: 22px !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
  .navBar-header .el-input__inner {
    height: 18px !important;
    line-height: 18px !important;
  }
}
</style>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  width: 250px;
}

::v-deep .el-tabs__item {
  height: 50px;
  line-height: 50px;
}

.tab-label {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  box-sizing: border-box;
  padding-right: 40px;

  & > span {
    display: block;
    // width: 240px;
    text-align: right;
  }
}

::v-deep .tab-image {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: block;

  .el-image {
    display: block;
  }
}

.el-tabs__content {
  overflow: unset;
}

.el-tab-pane {
  column-count: 4;
  box-sizing: border-box;
  padding: 0 50px;
}

::v-deep .el-tabs__active-bar {
  background-color: transparent;

  position: absolute;

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    content: '';
    height: 30px;
    width: 100%;
    transform: translateY(-50%);
    background-color: #00A972;
  }
}

.tab-content {
  // display: flex;
  // flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 50px;
  column-count: 4;

  &-box {
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    counter-increment: item-counter;
    width: 100%;
    margin-bottom: 10px;
    // width: 25%;
    // flex: 0 0 25%;

    &-label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;

      .tab-image {
        flex: 0 0 20px;
      }

      &-box {
        flex: 1;
        box-sizing: border-box;
        padding-right: 60px;

        &-text {
          box-sizing: border-box;
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #E6E6E6;
        }
      }
    }

    .tab-content-item {
      width: 100%;
      flex: 1;
      padding-left: 30px;
    }
  }

  &-item {
    width: 100%;
    // flex: 0 0 25%;
    height: 32px;
    font-size: 14px;
    display: flex;
    align-items: flex-end;

    &-inner {
      cursor: pointer;

      &:hover {
        color: #00A972;
      }
    }

    .tag {
      width: 38px;
      height: 16px;
      font-size: 12px;
      transform: scale(0.75);
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 2px;
      border-radius: 0px 4px 0px 4px;

      &.new {
        background: #CBE7DB;
        color: #0DAD78;
      }

      &.hot {
        background: #FFE7CC;
        color: #FF9924;
      }
    }
  }
}
</style>
