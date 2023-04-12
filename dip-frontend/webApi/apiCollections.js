export default $axios => ({
  //获取登录验证码-服务端
  handleGetLoginCod() {
    return $axios.$get("/captchaImage")
  },
  //客户端请求验证码
  handleGetLoginCodOfCilent() {
    return $axios.$get("/api/captchaImage")
  },
  //账号密码登录
  handleLogin(data) {
    return $axios.$get("/api/login", { params: data })
  },
  // 注册账户
  handleRegisterData(data) {
    return $axios.$post('/api/regist', data)
  },
  //获取首页banner图  /portal/banner/getInfo
  handleGetBannerLists(data) {
    return $axios.$get("/api/portal/banner/getInfo", { params: data })
  },
  //获取手机验证码
  handleGetphoneCode(data) {
    return $axios.$get("/api/getValidCode", { params: data })
  },
  //手机号码登录
  handleLoginForPhone(data) {
    return $axios.$get("/api/loginByPhone", { params: data })
  },
  //重置密码
  handleResetPwd(data) {
    return $axios.$get("/api/resetPassword", { params: data })
  },

  //修改密码
  handleEditPwd(data) {
    return $axios.$get("/api/editPassword", { params: data })
  },
  //获取首页数据
  handleGetHomeDataOfClient() {
    return $axios.$get(process.env.NUXT_ENV + "/portal/index/info")
  },
  //获取页脚配置数据  /portal/footer/getInfo
  handleGetHomeFooterData() {
    return $axios.$get("/api/portal/footer/getInfo")
  },
  //获取首页 平台能力数据
  handleGetCapList() {
    return $axios.$get("/api/portal/index/capList")
  },
  //获取首页 产品服务数据
  handleGetVOList() {
    return $axios.$get("/api/portal/index/typeVOList")
  },
  //获取首页 合作伙伴数据
  handleGetPartnerVOList() {
    return $axios.$get("/api/portal/index/partnerVOList")
  },

  //获取首页 解决方案数据
  handleGetSolutions() {
    return $axios.$get("/api/portal/index/solutionTypeVOS")
  },

  //获取解决方案详情
  handleGetSolutionDetail(id) {
    return $axios.$get(`/api/portal/solution/${id}`)
  },

  ///portal/productservice/{id}
  handleGetPlatFormDetail(id) {
    return $axios.$get(`/api/portal/platformcapability/${id}`)
  },
  //解决方案咨询
  handleSolutionconsult(data) {
    return $axios.$post("/api/portal/solutionconsult/", data)
  },
  //获取产品服务详情
  handleGetProductDetail(id) {
    return $axios.$get(`/api/portal/productservice/${id}`)
  },
  // 应用市场

  //获取subTag分类
  handleGetSubTagsOfClient(tagValue) {
    return $axios.$get("/api/portal/market/subTagInfo", { params: { tagValue } })
  },
  //获取tag分类
  handleGetTagsOfClient() {
    return $axios.$get("/api/portal/market/tagInfo")
  },
  //获取列表数据-客户端
  handleGetMarketListOfClient(data) {
    return $axios.$get("/api/portal/market/marketInfo", { params: data })
  },
  //获取列表数据
  //获取详情
  handleGetMarketDetail(id) {
    return $axios.$get(process.env.NUXT_ENV + `/portal/market/${id}`)
  },

  //购买应用 /portal/market/buy
  handlePayForMarket(data) {
    return $axios.$post(process.env.NUXT_ENV +'/portal/market/buy', data)
  },
  //新闻中心api

  //获取新闻中心的左侧分类列表
  handleNewsTypeOfClient() {
    return $axios.$get("api/portal/newscenter/typeInfo")
  },
  //获取根据选中列表 获取新闻分类
  handleNewsListOfClient(data) {
    return $axios.$get("api/portal/newscenter/list", { params: data })
  },

  //获取热门新闻数据
  handleHotNewsList(data) {
    return $axios.$get("api/portal/newscenter/hotList", { params: data })
  },
  //获取新闻详情
  handleGetNewsDetail(id) {
    return $axios.$get(`/api/portal/newscenter/${id}`)
  },
  //关于我们

  //获取关于我们的信息
  handleGetAboutUsOfClient(data) {
    return $axios.$get("/api/portal/aboutus/getInfo", { params: data })
  },
  //退出登录
  handleLogout() {
    return $axios.$post("/api/logout")
  },

  //用户中心
  //获取我的订单列表
  handleGetPayList(data) {
    return $axios.$get('/api/portal/market/list', { params: data })
  },

  //修改个人基本信息
  handleSettingInfor(data) {
    return $axios.$post('/api/edit', data)
  },

  // 获取租户
  getTenantListData() {
    return $axios.$get(process.env.NUXT_ENV + `/portal/market/getTenantList`)
  },

  // 获取环境列表
  getEnvList(data) {
    return $axios.$get(process.env.NUXT_ENV + `/portal/market/getEnvList`, { params: data })
  },
  // 获取集群列表
  getClusterList(tenantId,projectId) {
    return $axios.$get(`/dc/order-api/project/cluster/list/${tenantId}/${projectId}`)
  },

  // 获取参数列表
  getParamList(data) {
    return $axios.$get(process.env.NUXT_ENV + `/portal/market/getParamList`, { params: data })
  },

  // 获取租户列表 ----dc
  getTenantList() {
    return $axios.$get(`/dc/user-api/tenant/list`,)
  },
  // 企业申请 ----dc
  tenantApply(data) {
    return $axios.$post(`/dc/user-api/tenantApply/certification`, data)
  },
  // 企业申请结果查询 ----dc
  getTenantApply() {
    return $axios.$get(`/dc/user-api/tenantApply/certification`,)
  },

  //获取刷新token
  getRefreshToken(data) {
    return $axios.$post(`/dc/user-api/auth/refresh/token`, data)
  },
})
