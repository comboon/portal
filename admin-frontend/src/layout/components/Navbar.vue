<template>
  <div class="navbar1">
<!--    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/> -->
    <div class="left-title">
      <span class="b-titleTxt">东方电气门户后台管理系统</span>
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span class="userName_span">{{user.userName}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import { getUserProfile } from "@/api/system/user";
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  data(){
    return {
      user:{
        userName:null
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    },
  },
  created(){
    this.getUser();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar1 {
   height: 50px;
   line-height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #040D29;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  width: 100%;
  box-sizing: border-box;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
    background-color: #040D29;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-title{
    float:left;
    line-height: 50px;
    margin:0 20px;
     span{
       color:#fff;
    }
    .b-titleTxt{
      font-size:18px;
    }
    .s-titleTxt{
      font-size: 12px;
      line-height: 12px;
      margin: 2px 5px 0 5px;
      display: inline-block;
      .split-line{
        display: inline-block;
        height:1px;
        width:20px;
        background: #fff;
        vertical-align: middle;
        margin-right: -2px;
      }
    }
  }
  .right-menu {
    float: right;
    height: 50px;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .userName_span{
          color:white;
          font-size:16px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -23px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
