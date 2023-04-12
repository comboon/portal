import request from '@/utils/request'

// 查询门户核心服务‘关于我们’配置列表
export function listAbout(query) {
  return request({
    url: '/dip/about/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务‘关于我们’配置详细
export function getAbout(id) {
  return request({
    url: '/dip/about/' + id,
    method: 'get'
  })
}

// 新增门户核心服务‘关于我们’配置
export function addAbout(data) {
  return request({
    url: '/dip/about',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务‘关于我们’配置
export function updateAbout(data) {
  return request({
    url: '/dip/about',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务‘关于我们’配置
export function delAbout(id) {
  return request({
    url: '/dip/about/' + id,
    method: 'delete'
  })
}
