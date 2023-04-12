import request from '@/utils/request'

// 查询门户核心服务新闻中心配置列表
export function listNewscenter(query) {
  return request({
    url: '/dip/newscenter/list',
    method: 'get',
    params: query
  })
}

//查询新闻中心配置的菜单名称列表
export function listModuleMenu() {
  return request({
    url: '/dip/modulemenu/getList/' + 2,
    method: 'get'
  })
}

// 查询门户核心服务新闻中心配置详细
export function getNewscenter(id) {
  return request({
    url: '/dip/newscenter/' + id,
    method: 'get'
  })
}

// 新增门户核心服务新闻中心配置
export function addNewscenter(data) {
  return request({
    url: '/dip/newscenter',
    method: 'post',
    data: data
  })
}

//上架市场元素配置
export function publishNews(id) {
  return request({
    url: '/dip/newscenter/publish/' + id,
    method: 'post'
  })
}
//下架市场元素配置
export function unpublishNews(id) {
  return request({
    url: '/dip/newscenter/unpublish/' + id,
    method: 'post'
  })
}

// 修改门户核心服务新闻中心配置
export function updateNewscenter(data) {
  return request({
    url: '/dip/newscenter',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务新闻中心配置
export function delNewscenter(id) {
  return request({
    url: '/dip/newscenter/' + id,
    method: 'delete'
  })
}
