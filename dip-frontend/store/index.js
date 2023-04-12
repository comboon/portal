const cookieparser = process.server ? require
('cookieparser') : undefined

export const state = () => ({
    token: null,
    userInfor:{

    },
    selectedLang:"",
    headNavIndex:1, // 头部导航   刷新页面服务端渲染要取到上一次用户所选的index
    helpActiveIndex:1,   //帮助中心选择的navIndex
    baseUrl:""
  })

  export const mutations = {
      //设置token
    setToken(state,value) {
      state.token = value
    },
    //设置用户信息
    setUserInfor(state,obj){
        state.userInfor=obj
    },
    //设置国际语言
    setLangType(state,val){
        state.selectedLang=val
    },
    //设置顶部导航nav
    setNavIndex(state,index){
      state.headNavIndex=index
    },
    //设置帮助中心选择nav
    setHelpActive(state,index){
      state.helpActiveIndex=index
    },
    setBaseUrl(state,url){
      state.baseUrl=url
    }
  }


