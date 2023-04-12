<template>
  <div class="home">
    <div class="banner-wrapper">
      <el-carousel trigger="click" height="37vw" arrow="never">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.img" style="width: 100%; height: auto"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="platform-wrapper">
      <div class="p-title">
        <p class="text-zn">平台能力</p>
        <p class="text-en">PLATFORM CAPABILITY</p>
      </div>
      <div class="p-content">

        <div class="card-container">
          <i class="el-icon-arrow-left beforeIcon" @click="moveCard(-1)"></i>
          <div
            class="card"
            :style="{
              transform: 'translateX' + '(' + currentOffset + 'px' + ')',
            }"
          >
            <div
              class="p-item-wrapper"
              :class="{ hoverWrapper: hoverIndex === index }"
              v-for="(item, index) in capList"
              :key="item.id"
              ref="capItemWidth"
              @click="handleToPlatformDetail(item)"
            >
              <img :src="item.icon" class="item-svg"/>
              <p class="boldText-p" :class="{ hoverP: hoverIndex === index }">
                {{ item.capName }}
              </p>
              <p class="default-p" :class="{ hoverP: hoverIndex === index }">
                {{ item.description }}
              </p>
            </div>
          </div>
          <i class="el-icon-arrow-right afterIcon" @click="moveCard(1)"></i>
        </div>

      </div>
    </div>

    <div class="platform-wrapper wrapper-bg" v-if="voListOfIndex.length > 0" style="margin-top:65px;">
      <div class="p-title">
        <p class="text-zn">产品服务</p>
        <p class="text-en">多维度多体系互联网产品，提供用户互联网快速转型</p>
      </div>

      <div class="appli-box">
        <div class="arrow-box">
          <i class="el-icon-arrow-left beforeIcon" @click="moveCardVOlist(-1)"></i>

          <div class="nav-card-wrapper">


            <ul
              class="appliNav"
              :style="{
              transform: 'translateX' + '(' + voListOffset + 'px' + ')',
            }"
            >
              <li
                class="appliNavLi"
                ref="volistItemWidth"
                v-for="(item, index) in voListOfIndex"
                :key="index"
                :class="{ active: activeLi === index }"
                @mouseenter="handleChangePro(index)"
                @mouseleave="activeLi = -1"
              >
                <div class="navItem">
                  <div class="navItem-top" v-if="index % 3 === 0">
                    <img :src="appliNavIconHover" v-if="activeLi === index"/>
                    <img :src="appliNavIcon" v-else/>
                    <span
                      class="navName"
                      :class="{ activeTxt: activeLi === index }"
                    >{{ item.menuName }}</span
                    >
                  </div>

                  <div class="navItem-top" v-if="index % 3 === 1">
                    <img :src="appliNavIconHover1" v-if="activeLi === index"/>
                    <img :src="appliNavIcon1" v-else/>
                    <span
                      class="navName"
                      :class="{ activeTxt: activeLi === index }"
                    >{{ item.menuName }}</span
                    >
                  </div>

                  <div class="navItem-top" v-if="index % 3 === 2">
                    <img :src="appliNavIconHover2" v-if="activeLi === index"/>
                    <img :src="appliNavIcon2" v-else/>
                    <span
                      class="navName"
                      :class="{ activeTxt: activeLi === index }"
                    >{{ item.menuName }}</span
                    >
                  </div>

                  <p
                    class="navItem-desc"
                    :class="{ activeTxt: activeLi === index }"
                  >
                    {{ item.remark }}
                  </p>
                  <div class="appliNav-content">
                    <ul>
                      <li
                        v-for="(i, inde) in item.voList"
                        :key="inde"
                        :class="{ activeTxt: activeLi === index }"
                      >
                      <span @click="handleGetProductDetail(i)">{{
                          i.serviceName
                        }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

          </div>
          <i class="el-icon-arrow-right afterIcon" @click="moveCardVOlist(1)"></i>
        </div>


      </div>
    </div>

    <div class="platform-wrapper" v-if="sListOfIndex.length > 0" style="margin-top:76px;">
      <div class="p-title">
        <p class="text-zn">解决方案</p>
        <p class="text-en">深耕行业，深挖痛点，提供交钥匙行业解决方案</p>
      </div>
      <div class="solution-box">

        <div class="nav-card-wrapper">
          <i
            class="el-icon-arrow-left beforeIcon"
            @click="moveCardSolution(-1)"
          ></i>
          <div class="solution-cards">
            <ul
              class="solutionForm"
              :style="{
                transform: 'translateX' + '(' + solutionOffset + 'px' + ')',
              }"
            >
              <li
                class="appliNavLi"
                ref="solutionItemWidth"
                v-for="(item, index) in sListOfIndex"
                @click="handleChangeSolutionNav(index, item.menuName)"
                :key="index"
              >
                <div class="navItem">
                  <span
                    class="navName"
                    :class="{ activeNav: defaultSolutionIndex === index }"
                  >{{ item.menuName }}</span
                  >
                </div>
              </li>
            </ul>
          </div>

          <i
            class="el-icon-arrow-right afterIcon"
            @click="moveCardSolution(1)"
          ></i>
        </div>

        <div class="solutionCard">
          <div class="card-left">
            <img :src="defaultSolutionInfor.bgImgUrl" alt=""/>
          </div>
          <div class="card-right">
            <div class="card-right-top">
              <p class="top-head-text">
                {{ defaultSolutionInfor.solutionName }}
              </p>
              <p class="ellipsis desc-box">
                {{ defaultSolutionInfor.bgImgDescription }}
              </p>
              <el-button
                type="primary"
                style="margin-top: 20px"
                class="see-btn"
                @click="handleToDetail(defaultSolutionInfor)"
              >
                查看详情
              </el-button>
            </div>
            <div class="card-right-main">
              <ul class="main-ul">
                <li
                  v-for="item in activeSolutionList"
                  :key="item.id"
                  @click="handleToDetail(item)"
                >
                  <span>{{ item.solutionName }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="platform-wrapper" style="margin-top:110px;">
      <div class="p-title">
        <p class="text-zn">合作伙伴</p>
        <p class="text-en">携手共赢，与全球合作伙伴共建制造生态</p>
      </div>
      <div class="partners-list">
        <ul class="partnerUl">
          <li v-for="(item, index) in partnerVOList" :key="index">
            <img :src="item.icon" @click="handleLinkOpen(item.websiteUrl)"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";

export default {
  name: "home",
  layout: "BaseLayout",
  data() {
    return {
      baseUrl: "http://119.3.194.28:39021/",
      imgHeight: 0,
      bannerList: [
        {
          imgUrl: require("assets/images/banner-gif.gif"),
          id: 1,
        },
        // {
        //   imgUrl: require("assets/images/img-wdzxbanner.png"),
        //   id: 2,
        // },
        // {
        //   imgUrl: require("assets/images/img-xwzxbanner.png"),
        //   id: 3,
        // },
        // {
        //   imgUrl: require("assets/images/img-yyscbanner.png"),
        //   id: 4,
        // },
      ],
      itemImg1: require("assets/images/ico-fzwl.svg"),
      itemImg1hover1: require("assets/images/ico-fzwl2.svg"),
      hoverIndex: -1,
      activeNavIndex: 0,
      appliNavIcon: require("assets/images/ico-bycp.svg"),
      appliNavIcon1: require("assets/images/ico-cp-pt.svg"),
      appliNavIcon2: require("assets/images/ico-cp-yy.svg"),
      appliNavIconHover: require("assets/images/ico-cp-by2.svg"),
      appliNavIconHover1: require("assets/images/ico-cp-pt2.svg"),
      appliNavIconHover2: require("assets/images/ico-cp-yy2.svg"),
      cardImg: require("assets/images/img-bianyan.png"),
      cardImgs: require("assets/images/img-jiejuefangan.png"),
      capList: [], //平台能力
      capItemWidth: -1, //平台card偏移量
      partnerVOList: [], //合作伙伴集合
      solutionTypeVOS: [], // 导航上解决方案分类集合
      defaultSolutionIndex: -1,
      activeSolutionList: [], // 选择的解决方案
      menuVOList: [], //导航上产品服务分类集合
      volistItemWidth: -1, //偏移量
      activeLi: -1,
      voListOfIndex: [], //首页-产品服务数组
      sListOfIndex: [], //首页-解决方案list
      solutionItemWidth: -1,
      defaultSolutionInfor: {},
      currentOffset: 0,
      voListOffset: 0,
      solutionOffset: 0,
    };
  },
  mounted() {
    console.log(121212,process.env.NUXT_ENV)
    this.handleGetCapList(this.capNum);
    this.handleGetBannerList();
    this.handleGetOVList(this.volistPageNum);
    this.handleGetSolutionList(this.sPageNum);
    this.handleGetPartnerList();
    this.$nextTick(() => {
      this.handleAutoNum();
    });
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <= this.capItemWidth * -1 * (this.capList.length - 5)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },

    atEndOfVoList() {
      return (
        this.voListOffset <=
        this.volistItemWidth * -1 * (this.voListOfIndex.length - 3)
      );
    },
    atHeadOfVoList() {
      return this.voListOffset === 0;
    },

    atEndOfSoution() {
      return (
        this.solutionOffset <=
        this.solutionItemWidth * -1 * (this.sListOfIndex.length - 3)
      );
    },
    atHeadOfSolution() {
      return this.solutionOffset === 0;
    },
  },
  methods: {
    //自动计算偏移量
    handleAutoNum() {
      window.addEventListener("resize", () => {
        if (this.$refs.capItemWidth !== undefined) {
          this.capItemWidth = this.$refs.capItemWidth[0].clientWidth;
        }
        if (this.$refs.volistItemWidth !== undefined) {
          this.volistItemWidth = this.$refs.volistItemWidth[0].clientWidth + 20;
        }
        if (this.$refs.solutionItemWidth !== undefined) {
          this.solutionItemWidth = this.$refs.solutionItemWidth[0].clientWidth;
        }
      });
    },
    //获取首页数据
    async handleGetHomeData() {
      Cookies.remove("menuVOList", []);
      Cookies.remove("solutionTypeVOS", []);
      let resData = (await this.$homeApi.article.handleGetHomeDataOfClient())
        .data.data;
      this.menuVOList = resData.menuVOList;
      console.log(JSON.stringify(this.menuVOList));
      if (this.menuVOList.length > 0) {
        Cookies.set("menuVOList", JSON.stringify(this.menuVOList));
      }

      this.solutionTypeVOS = resData.solutionTypeVOS; // 解决方案分类集合
      console.log(JSON.stringify(this.solutionTypeVOS));
      if (this.solutionTypeVOS.length > 0) {
        this.defaultSolutionIndex = 0;
        this.activeSolutionList = this.solutionTypeVOS[0].voList;
        Cookies.set("solutionTypeVOS", JSON.stringify(this.solutionTypeVOS));
      }
    },
    //获取banner
    async handleGetBannerList() {
      let obj = {
        type: 0,
      };
      let resData = await this.$homeApi.article.handleGetBannerLists(obj);
      console.log(resData);
      if (resData.data.length > 0) {
        resData.data.forEach((item) => {
          item.img = process.env.NUXT_ENV + item.img;
        });
        this.bannerList = resData.data;
        console.log(this.bannerList);
      }
    },
    //获取平台能力  handleGetCapList
    async handleGetCapList(pageNum) {
      this.capList = [];
      let resData = await this.$homeApi.article.handleGetCapList();
      if (resData.rows.length > 0) {
        resData.rows.forEach((item) => {
          item.icon = process.env.NUXT_ENV + item.icon;
        });
        this.capList = resData.rows;
      }
    },
    imgLoad() {
      this.$nextTick(function () {
        // 获取窗口宽度*图片的比例，定义页面初始的轮播图高度
        this.imgHeight = (document.body.clientWidth * 1) / 4;
      });
    },
    //获取下一页,上一页平台数据
    changeCapListPages(type) {
      if (this.capTotalNum > this.capNum && type === "next") {
        this.capNum += 1;
        this.handleGetCapList(this.capNum);
      } else {
        this.capNum -= 1;
        this.handleGetCapList(this.capNum);
      }
    },
    //  获取 产品服务数据
    async handleGetOVList(pageNum) {
      this.voListOfIndex = [];
      let resData = await this.$homeApi.article.handleGetVOList();
      console.log(resData);
      if (resData.rows.length > 0) {
        resData.rows.forEach(row => {
          let voList = [];
          row.typeVOList.forEach(typeVO => {
            voList = voList.concat(typeVO.voList)
          })
          row.voList = voList;
        })
        this.voListOfIndex = resData.rows;
      }
    },
    // changeVoListPage(type) {
    //   console.log(`总页数${this.voListTotalPage} 当前页${this.volistPageNum}`);
    //   if (this.voListTotalPage > this.volistPageNum && type === "next") {
    //     this.volistPageNum += 1;
    //     this.handleGetOVList(this.volistPageNum);
    //   } else {
    //     this.volistPageNum -= 1;
    //     this.handleGetOVList(this.volistPageNum);
    //   }
    // },

    //获取解决方案数据  handleGetSolutions
    async handleGetSolutionList(pageNum) {
      this.sListOfIndex = [];

      let resData = await this.$homeApi.article.handleGetSolutions();
      console.log(resData);
      if (resData.rows.length > 0) {
        resData.rows.forEach((item) => {
          if (item.voList.length > 0) {
            item.voList.forEach((i) => {
              i.bgImgUrl = process.env.NUXT_ENV + i.bgImgUrl;
            });
          }
        });
        this.defaultSolutionIndex = 0;
        this.sListOfIndex = resData.rows;
        this.activeSolutionList = this.sListOfIndex[0].voList;
        this.defaultSolutionInfor = this.sListOfIndex[0].voList[0];
      }
    },
    //获取下一页,上一页解决方案数据
    changeSolutionPages(type) {
      console.log(`总页数${this.sTotalPages} 当前页${this.sPageNum}`);
      if (this.sTotalPages !== this.sPageNum && type === "next") {
        this.sPageNum += 1;
        this.handleGetSolutionList(this.sPageNum);
      } else {
        this.sPageNum -= 1;
        this.handleGetSolutionList(this.sPageNum);
      }
    },

    //获取首页 合作伙伴数据
    async handleGetPartnerList() {
      let resData = (await this.$homeApi.article.handleGetPartnerVOList()).rows;
      if (resData.length > 0) {
        resData.forEach((item) => {
          item.icon = process.env.NUXT_ENV + item.icon;
        });
        this.partnerVOList = resData;
        setTimeout(() => {
          if (this.$refs.capItemWidth !== undefined) {
            this.capItemWidth = this.$refs.capItemWidth[0].clientWidth;
            console.log("宽度" + this.capItemWidth);
          }
          if (this.$refs.volistItemWidth !== undefined) {
            this.volistItemWidth =
              this.$refs.volistItemWidth[0].clientWidth + 20;
            console.log("宽度" + this.volistItemWidth);
          }
          if (this.$refs.solutionItemWidth !== undefined) {
            this.solutionItemWidth =
              this.$refs.solutionItemWidth[0].clientWidth;
            console.log("宽度" + this.solutionItemWidth);
          }
        }, 1000);
      }
    },

    handleHover(index) {
      this.hoverIndex = index;
    },
    handleChangePro(index) {
      this.activeLi = index;
    },
    //切换解决方案nav
    handleChangeSolutionNav(index) {
      this.defaultSolutionIndex = index;
      this.activeSolutionList = this.sListOfIndex[index].voList;
      this.defaultSolutionInfor = this.sListOfIndex[index].voList[0];
    },
    //跳转到合作伙伴的网址
    handleLinkOpen(url) {
      console.log(url);
      if (url !== null) {
        window.open(url);
      }
    },
    /**
     * method:handleToDetail
     * desc:跳转到解决方案，根据后台配置的跳转方式跳转，
     * params: nav.showType 1 =详情展示，
     */
    handleToDetail(nav) {
      if (nav.showType === 1) {
        this.$router.push({
          name: "solutions",
          query: {
            id: nav.id,
          },
        });
        Cookies.set("headNavIndex", 3);
        this.$store.commit("setNavIndex", 3);
      } else {
        window.open(nav.outUrl);
      }
    },
    /**
     * method:handleGetProductDetail
     * desc:跳转到产品服务，根据后台配置的跳转方式跳转，
     * params: nav.showType 1 =详情展示，  0 = 关联了市场元素， 具体的市场元素详情 2 =外部链接
     */
    handleGetProductDetail(nav) {
      if (nav.showType === 0) {
        this.$router.push({
          path: "/applicationMarket/marketDetail",
          query: {
            id: nav.elementId,
          },
        });
        Cookies.set("headNavIndex", 4);
        this.$store.commit("setNavIndex", 4);
      } else if (nav.showType === 1) {
        this.$router.push({
          name: "product",
          query: {
            id: nav.id,
          },
        });
        Cookies.set("headNavIndex", 2);
        this.$store.commit("setNavIndex", 2);
      } else {
        window.open(nav.outUrl);
      }
    },
    moveCard(direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.capItemWidth;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.capItemWidth;
      }
    },
    moveCardVOlist(direction) {
      if (direction === 1 && !this.atEndOfVoList) {
        this.voListOffset -= this.volistItemWidth;
      } else if (direction === -1 && !this.atHeadOfVoList) {
        this.voListOffset += this.volistItemWidth;
      }
    },
    moveCardSolution(direction) {
      if (direction === 1 && !this.atEndOfSoution) {
        this.solutionOffset -= this.solutionItemWidth;
        this.defaultSolutionIndex += 1;
        this.activeSolutionList =
          this.sListOfIndex[this.defaultSolutionIndex].voList;
        this.defaultSolutionInfor =
          this.sListOfIndex[this.defaultSolutionIndex].voList[0];
      } else if (direction === -1 && !this.atHeadOfSolution) {
        this.solutionOffset += this.solutionItemWidth;
        this.defaultSolutionIndex -= 1;
        this.activeSolutionList =
          this.sListOfIndex[this.defaultSolutionIndex].voList;
        this.defaultSolutionInfor =
          this.sListOfIndex[this.defaultSolutionIndex].voList[0];
      }
    },
    /**
     * method:handleToPlatformDetail
     * desc:跳转到平台能力，根据后台配置的跳转方式跳转，
     * params: nav.showType 1 =详情展示，  0 = 关联了市场元素， 具体的市场元素详情 2 =外部链接
     */
    handleToPlatformDetail(nav) {
      if (nav.showType === 0) {
        this.$router.push({
          name: "platform",
          query: {
            id: nav.elementId,
          },
        });
      } else if (nav.showType === 1) {
        this.$router.push({
          name: "platform",
          query: {
            id: nav.id,
          },
        });
      } else {
        window.open(nav.outUrl);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navItem-desc {
  font-size: 14px;
  color: #808080;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 18px;
  margin-bottom: 61px;
}

.card-right {
  // flex: 0 0 58%;
}

.appli-box {
  width: 1200px;
  margin: 0 auto;
}

.banner-wrapper {
  margin-bottom: 62px;
}

.platform-wrapper {
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 43px;

  .p-content {
    width: 100%;
    height: 254px;
    display: flex;

    .card-container {
      height: 254px;
      width: 85%;
      overflow: hidden;
      position: relative;

      .card {
        width: 100%;
        display: flex;
        transition: transform 150ms ease-out;

        .p-item-wrapper {
          flex: 0 0 20%;
        }
      }

      .beforeIcon {
        position: absolute;
        top: 80px;
        font-size: 16px;
        left: 0;
        color: #808080;
        z-index: 100;
        width: 36px;
        height: 36px;
        cursor: pointer;
      }

      .afterIcon {
        position: absolute;
        top: 80px;
        right: 0;
        font-size: 16px;
        color: #808080;
        width: 36px;
        height: 36px;
        cursor: pointer;
      }
    }
  }

  .p-title p {
    text-align: center;
  }

  .text-zn {
    height: 30px;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    margin-bottom: 30px;
  }

  .text-en {
    margin-bottom: 68px;
    font-size: 16px;
    font-weight: 400;
    color: #b3b3b3;
    line-height: 17px;
    opacity: 0.7;
  }

  .p-content {
    justify-content: center;

    .p-item-wrapper {
      // display: inline-block;
      // flex: 0 0 20%;
      background: #fefffc;
      margin-bottom: 16px;
      text-align: center;
      cursor: pointer;

      .item-svg {
        width: 90px;
        height: 90px;
        margin: 0 13px 22px 15px;
      }

      .boldText-p {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
        text-align: center;
        margin-bottom: 10px;
      }

      .default-p {
        font-size: 14px;
        color: #808080;
        text-align: center;
      }

      .hoverSpan,
      .hoverP {
        color: #ffffff;
      }
    }

    .hoverWrapper {
      background: #00a972;
    }
  }

  .appli-box {
    position: relative;
    display: flex;
    width: 80%;
    justify-content: center;

    .arrow-box {
      position: relative;
      width: 86%;

      .beforeIcon {
        position: absolute;
        left: 2px;
        top: 124px;
        font-size: 16px;
        z-index: 100;
      }

      .afterIcon {
        position: absolute;
        top: 124px;
        right: 2px;
        font-size: 16px;
      }
    }

    .nav-card-wrapper {
      display: flex;
      width: 92.3%;
      overflow: hidden;
      margin: 0 auto;
    }

    .appliNav {
      display: flex;
      width: 100%;
      transition: transform 150ms ease-out;

      .appliNavLi {
        flex: 0 0 31.9%;
        margin-right: 20px;
        cursor: pointer;
        background: #fff;

        .navItem {
          padding: 37px 20px;

          .navItem-top {
            img {
              width: 28px;
              height: 28px;
              vertical-align: middle;
              margin-right: 15px;
            }

            .navName {
              font-size: 20px;
              color: #333;
              margin-bottom: 18px;
              vertical-align: middle;
            }

            .activeTxt {
              color: #fff;
            }
          }

          .appliNav-content {
            ul {
              li {
                display: inline-block;
                width: 46%;
                padding: 10px 2%;
                font-size: 16px;
                cursor: pointer;
                color: #00a972;
                vertical-align: top;

                span:hover {
                  border-bottom: 1px solid #fff;
                }
              }

              .activeTxt {
                color: #fff;
              }
            }
          }
        }
      }

      .active {
        background: linear-gradient(230deg, #03cf8d 0%, #00a972 100%);
        background: url('~/assets/images/img-chanpin.png') no-repeat;
        box-shadow: -2px 2px 12px 0px rgba(0, 0, 0, 0.3);
        background-size: cover;
        // border-left: 1px solid #00A972;
      }

      .activeTxt {
        color: #fff;
      }
    }

    .platformUL {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      border-bottom: 1px solid #e5e5e5;
      position: relative;

      .beforeIcon,
      .afterIcon {
        top: 25px;
      }

      li {
        flex: 0 0 20%;
        text-align: center;
        font-size: 22px;
        cursor: pointer;

        .navItem {
          padding: 20px 20px;
        }
      }

      .activeNav {
        border-bottom: 2px solid #00a972;
      }
    }
  }

  .nav-card {
    display: flex;
    padding: 10px 10px;
    background: #f2f2f2;

    div {
      flex: 1;
    }

    .card-text {
      margin-top: 74px;
      margin-left: 135px;

      .text-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 31px;
      }

      .textUl {
        display: flex;
        flex-wrap: wrap;

        li {
          flex: 0 0 50%;
          margin-bottom: 21px;
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
  }

  .card-warpper {
    margin-top: 34px;

    .el-carousel__item {
      .card-infor-box {
        display: flex;
        padding: 10px 10px;
        background-color: #00a972;

        .box-right,
        .box-left {
          flex: 0 0 50%;
          color: #fff;
        }

        .box-left {
          .title-text {
            font-size: 24px;
            font-weight: bold;
            margin: 14px 0;
          }

          .text-desc {
            font-size: 14px;
            margin-bottom: 60px;
          }

          .nvaGroup {
            .navTitle {
              font-size: 18px;
              font-weight: bold;
              color: #000;
              margin-bottom: 15px;
            }

            .groupUl {
              display: flex;
              flex-wrap: wrap;

              li {
                flex: 0 0 50%;
                font-size: 16px;
                font-weight: 400;
                color: #fff;
                padding: 10px 0;
                margin-bottom: 5px;
              }
            }
          }
        }

        .box-right {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

.wrapper-bg {
  width: 100%;
  padding: 80px 0;
  background: #eff3f4;
  // .card-container{
  //    height: 254px;
  //    width: 80%;
  //    margin:0 auto;
  //    overflow: hidden;
  //    .card{
  //      width:100%;
  //      display: flex;
  //      transition: transform 150ms ease-out;
  //    }
  // }
}

.partnerUl {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    width:23.33%;
    margin-bottom: 30px;
    text-align: center;

    img {
      width: 100%;
      height: auto;
    }
  }

  li:last-child:nth-child(4n + 2){
    margin-right: calc((100% - 23.33%) / 3 * 2);
  }

  li:last-child:nth-child(4n + 3){
    margin-right: calc((100% - 23.33%) / 3 * 1);
  }
}



.solution-box {
  position: relative;
  width: 85%;
  margin: 0 auto;
}

.solution-box .nav-card-wrapper {
  display: flex;
  overflow: hidden;
  justify-content: center;
  border-bottom: 1px solid #ebedee;

  .solution-cards {
    display: flex;
    overflow: hidden;
    width: 1200px;
  }

  .beforeIcon {
    position: absolute;
    top: 10px;
    font-size: 16px;
    left: -2px;
    color: #808080;
  }

  .afterIcon {
    position: absolute;
    top: 10px;
    font-size: 16px;
    right: -2px;
    color: #808080;
  }
}

.solutionForm {
  display: flex;
  transition: transform 150ms ease-out;
  width: 1200px;

  .beforeIcon,
  .afterIcon {
    top: 25px;
  }

  li {
    flex: 0 0 32.3333%;
    text-align: center;
    font-size: 20px;
    color: #333;
    cursor: pointer;

    .navItem {
      .navName {
        display: inline-block;
        padding: 8px 20px;
      }
    }
  }

  .activeNav {
    color: #00a972;
    border-bottom: 2px solid #00a972;
  }
}

.solutionCard {
  display: flex;
  border-top: none;
  margin-top: 55px;

  .card-left {
    width: 460px;
    height: 460px;
    flex: 0 0 460px;
    margin-right: 2%;

    img {
      max-width: 100%;
      width: auto;
      height: 100%;
      max-height: 460px;
    }
  }

  .card-right {
    flex: 1;

    .card-right-top {
      padding-left: 5px;
      padding-top: 5px;
      height: 289px;
      border-left: 2px solid #00a972;
      padding-left: 36px;
      position: relative;
      box-shadow: 0px 5px 10px 0px rgba(51, 51, 51, 0.1);

      .top-head-text {
        font-size: 20px;
        color: hsl(0, 0%, 20%);
        font-weight: 400;
        margin-bottom: 47px;
      }

      .see-btn {
        position: absolute;
        bottom: 49px;
      }

      p {
        font-size: 14px;
        color: #808080;
      }

      .desc-box {
        min-height: 50px;
        padding-right: 20px;
      }
    }

    .card-right-main {
      min-height: 156px;
      padding-top: 10px;
      // min-height: 100px;
      background: #f2fbf8;

      .main-title {
        padding: 20px 0;
        font-size: 18px;
        font-weight: bold;
      }

      .main-ul {
        width: 94%;
        margin: 60px 36px;

        li {
          display: inline-block;
          margin-right: 49px;
          font-size: 16px;
          margin-bottom: 14px;
          font-weight: 400;
          color: #00a972;
          padding-bottom: 2px;
          cursor: pointer;

          span:hover {
            border-bottom: 2px solid #00a972;
          }

          .item-wapper {
            padding: 0 10px;

            i {
              float: right;
            }
          }
        }
      }
    }
  }
}

.partners-list {
  width: 85%;
  margin: 0 auto;
}

@media screen and (min-width: 1440px) and (max-width: 1680px) {
  .platform-wrapper .appli-box .platformUL li {
    font-size: 16px;
  }
  //  .platform-wrapper .appli-box .beforeIcon{
  //   top:100px;
  //   left:-40px;
  // }
  //  .platform-wrapper .appli-box .afterIcon{
  //    top:100px;
  //    right:-40px;
  //  }
}

@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .platform-wrapper .appli-box .platformUL li {
    font-size: 16px;
  }
  .navItem-desc {
    margin-bottom: 50px;
  }
  .footer .footer-main .main-right .right-item:first-child {
    flex: 0 0 57%;
  }
  .footer .footer-main .main-right .right-item:last-child {
    flex: 0 0 40%;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1280px) {
  .platform-wrapper .appli-box .platformUL li {
    font-size: 16px;
  }
  .platform-wrapper .appli-box .appliNav .appliNavLi .navItem .appliNav-content ul li {
    font-size: 14px;
  }
  .navItem-desc {
    margin-bottom: 40px;
  }
  .footer .footer-main .main-right .right-item:first-child {
    flex: 0 0 57%;
  }
  .footer .footer-main .main-right .right-item:last-child {
    flex: 0 0 40%;
  }
}

.beforeIcon,
.afterIcon {
  width: 36px;
  height: 36px;
  cursor: pointer;
  z-index: 100;
}

.afterIcon {
  text-align: right;
}
</style>
