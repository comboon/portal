import './public-path'
import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'

import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import '@/assets/styles/font-awesome.min.css' // 字体图标

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
//import UEditor from "@/components/UEditor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
//图片、视频上传组件
import imgAndVideoUpload from '@/components/imgAndVideoUpload'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('imgAndVideoUpload',imgAndVideoUpload)

//import '../public/static/UE/themes/default/css/ueditor.css'
// import '../public/static/UE/ueditor.config.js'
// import '../public/static/UE/ueditor.all.min.js'
// import '../public/static/UE/lang/zh-cn/zh-cn.js'
// import '../public/static/UE/ueditor.parse.min.js'

// Vue.component('UEDitor', UEditor)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
DictData.install()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Element.Dialog.props.lockScroll.default = false;

Element.Dialog.props.appendToBody.default = true;

Vue.config.productionTip = false

router.afterEach((to,from,next) => {
  window.scrollTo(300,300)
});


let instance = null

function render(props) {
  instance =  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')   //挂载到自己的html中， 基座会拿到挂载后的html， 将其插入
}

// function render(props = {}) {
//   const { container } = props;
//   router = new VueRouter({
//     base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
//     mode: 'history',
//     routes,
//   });
//
//   instance = new Vue({
//     router,
//     store,
//     render: (h) => h(App),
//   }).$mount(container ? container.querySelector('#app') : '#app');
// }


if (!window.__POWERED_BY_QIANKUN__) { // 默认独立运行
  console.log('单独运行')
  render();
}



// 打包成类库
export async function bootstrap(props) {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log(props)
  render(props)
}
export async function unmount(props) {
  instance.$destroy()
}



// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })
