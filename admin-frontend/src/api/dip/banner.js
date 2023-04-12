import request from '@/utils/request'

// 查询门户核心服务横幅配置列表
export function listBanner(query) {
  return request({
    url: '/dip/banner/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务横幅配置详细
export function getBanner(id) {
  return request({
    url: '/dip/banner/' + id,
    method: 'get'
  })
}

// 新增门户核心服务横幅配置
export function addBanner(data) {
  return request({
    url: '/dip/banner',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务横幅配置
export function updateBanner(data) {
  return request({
    url: '/dip/banner',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务横幅配置
export function delBanner(id) {
  return request({
    url: '/dip/banner/' + id,
    method: 'delete'
  })
}
