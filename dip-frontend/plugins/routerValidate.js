/*
 * @Author: Tentel
 * @Date: 2022-06-27 16:17:06
 * @LastEditors: Tentel
 * @LastEditTime: 2022-10-25 16:01:47
 */
import Cookies from "js-cookie";
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    let pathName = to.path;
    console.log(pathName === '/');
    switch (pathName) {
      case '/':
        console.log("前往首页");
        Cookies.set("headNavIndex", 1);
        store.commit("setNavIndex", 1);
        break;
      case '/product/':
        Cookies.set("headNavIndex", 2);
        store.commit("setNavIndex", );
        break;
      case '/solutions/':
        Cookies.set("headNavIndex", 3);
        store.commit("setNavIndex", 3);
        break;
      case '/applicationMarket/':
        Cookies.set("headNavIndex", 4);
        store.commit("setNavIndex", 4);
        break;
      case  '/newsCenter/':
        Cookies.set("headNavIndex", 5);
        store.commit("setNavIndex", 5);
        break;
      case '/aboutUs':
        Cookies.set("headNavIndex", 6);
        store.commit("setNavIndex", 6);
        break;
      case '/helpCenter':
        Cookies.set("headNavIndex", 7);
        store.commit("setNavIndex", 7);
        break;
    }
    //如果不是访问的登录界面,注册，token 又为空， 就前往登录页
    // if (to.name === 'login' && store.state.token === null) {
    //   console.log('aaa');
    //   console.log(store.state.token);
    //   next()
    // } 
    // else if (to.name === 'register') {
    //   next()
    // } 
    // else if(to.name==='login' &&  store.state.token !== null) {
    //   next('/')
    //   store.commit('setNavIndex',1)
    // }
    next();
  })
  app.router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
  })
}