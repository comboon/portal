import request from '@/utils/request'

// 查询门户核心服务标签配置列表
export function listTag(query) {
  return request({
    url: '/dip/tag/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务标签配置详细
export function getTag(id) {
  return request({
    url: '/dip/tag/' + id,
    method: 'get'
  })
}

// 新增门户核心服务标签配置
export function addTag(data) {
  return request({
    url: '/dip/tag',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务标签配置
export function updateTag(data) {
  return request({
    url: '/dip/tag',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务标签配置
export function delTag(id) {
  return request({
    url: '/dip/tag/' + id,
    method: 'delete'
  })
}
