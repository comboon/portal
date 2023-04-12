<template>
  <div
       class="nav_box"
       :class="changeCollapse ? 'minD' : 'maxD'"
       :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div class="trapezoid_wrapper" @click="isCollapse">
      <i class="el-icon-s-fold iconfont" size="16"></i>
    </div>
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :active-text-color="settings.theme"
        :collapse="changeCollapse"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
      <!-- <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
          :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
          :unique-opened="true"
          :active-text-color="settings.theme"
          :collapse-transition="false"
          mode="vertical"
      >
          <sidebar-item
              v-for="(route, index) in sidebarRouters"
              :key="route.path  + index"
              :item="route"
              :base-path="route.path"
          />
      </el-menu> -->
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  components: {SidebarItem, Logo},
  data() {
    return {
      changeCollapse:false,
    }
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    // isCollapse() {
    //   // return !this.sidebar.opened;
    // }
  },
  methods:{
    isCollapse() {
      this.changeCollapse = !this.changeCollapse
      this.$emit('transfer',this.changeCollapse)
    }
  }
};
</script>
<style scoped lang="scss">
.nav_box {
  position: relative;

  .trapezoid_wrapper {
    width: 0;
    height: 40px;
    border-right: 20px solid #f1f3f6;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    position: absolute;
    right: 0;
    top: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    cursor: pointer;

    .iconfont {
      position: relative;
      left: 10px;
      font-size: 16px;
    }
  }

}
.minD{
  width:50px;
}

.maxD{
  width:200px;
}

</style>

