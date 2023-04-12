<template>
  <div>
    <vue-ueditor-wrap v-model="currentValue" :config="myConfig" @ready="ready" :destroy="true"></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { getToken } from "@/utils/auth";
export default {
  name: "Editor",
  components: {
    VueUeditorWrap
  },
  props: {
    /* 编辑器的内容 */
    value: {
      type: String,
      default: "",
    },
    initHtml:{
      type:String,
        default:""
    }
  },
  data() {
    return {
      currentValue: '',
      headers: {
        Authorization: "Bearer " + getToken()
      },
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 工具栏是否可以浮动
        autoFloatEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: true,
        zIndex : 3000,     //编辑器层级的基数,默认是900
        // 上传文件接口
        serverUrl: process.env.VUE_APP_BASE_API + "/ueditor/controller", // 上传的图片服务器地址
        // serverUrl: "http://localhost:8090" + "/ueditor/controller", // 上传的图片服务器地址
        // UEditor 资源文件的存放路径
        UEDITOR_HOME_URL:process.env.VUE_APP_BASE_API.split('dip')[0] + 'ueditor/'
      }
    }
  },
  computed: {
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? "" : val;
        }
      },
      immediate: true,
    },
    currentValue:{
      handler(val) {
        if (val !== this.value) {
          this.$emit("input",val)
        }

      },
      immediate: true,
    }
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    ready (editorInstance) {
      if(this.initHtml){
        this.currentValue=this.initHtml
      }
    },
  },
};
</script>

<style>
</style>
