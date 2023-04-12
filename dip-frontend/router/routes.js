/*
 * @Author: Tentel
 * @Date: 2022-09-27 18:36:42
 * @LastEditors: Tentel
 * @LastEditTime: 2022-10-14 18:17:52
 */
const BASE = window.__POWERED_BY_QIANKUN__ ? '/gateway' : ''

function dynamicImport(path) {
  if(path.indexOf('Detail')>0){
    return import(`~/pages/${path.replace('Detail','')}/detail.vue`).then(m => m.default || m)
  }
  return import(`~/pages/${path}/index.vue`).then(m => m.default || m)
}

const resolveRoute = route => ({
  ...route,
  component: () => dynamicImport(route.component),
})

function dynamicImportRoute(routes) {
  return routes.map(route => ({
    ...resolveRoute(route),
    children: route.children ? route.children.map(resolveRoute) : [],
  }))
}

let routes = [
  {
    path: `${BASE}/index`,
    name: 'index',
    component: 'index',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/applicationMarket`,
    name: 'applicationMarket',
    component: 'applicationMarket',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/applicationMarket/detail`,
    name: 'applicationMarketDetail',
    component: 'applicationMarketDetail',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/login`,
    name: 'login',
    component: 'login',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/newsCenter`,
    name: 'newsCenter',
    component: 'newsCenter',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/newsCenter/detail`,
    name: 'newsCenterDetail',
    component: 'newsCenterDetail',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/helpCenter`,
    name: 'helpCenter',
    component: 'helpCenter',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/product`,
    name: 'product',
    component: 'product',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/solutions`,
    name: 'solutions',
    component: 'solutions',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/userCenter`,
    name: 'userCenter',
    component: 'userCenter',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/userInfo`,
    name: 'userInfo',
    component: 'userInfo',
    alias: `${BASE}`
  },
  {
    path: `${BASE}/aboutUs`,
    name: 'aboutUs',
    component: 'aboutUs',
    alias: `${BASE}`
  },
]

export default dynamicImportRoute(routes)
