import request from '@/utils/request'

// 查询门户核心服务页脚配置列表
export function listFooter(query) {
  return request({
    url: '/dip/footericon/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务页脚配置详细
export function getFooter(id) {
  return request({
    url: '/dip/footericon/' + id,
    method: 'get'
  })
}

// 新增门户核心服务页脚配置
export function addFooter(data) {
  return request({
    url: '/dip/footericon',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务页脚配置
export function updateFooter(data) {
  return request({
    url: '/dip/footericon',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务页脚配置
export function delFooter(id) {
  return request({
    url: '/dip/footericon/' + id,
    method: 'delete'
  })
}
