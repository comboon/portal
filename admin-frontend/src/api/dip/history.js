import request from '@/utils/request'

// 查询门户核心服务平台历程配置列表
export function listHistory(query) {
  return request({
    url: '/dip/history/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务平台历程配置详细
export function getHistory(id) {
  return request({
    url: '/dip/history/' + id,
    method: 'get'
  })
}

// 新增门户核心服务平台历程配置
export function addHistory(data) {
  return request({
    url: '/dip/history',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务平台历程配置
export function updateHistory(data) {
  return request({
    url: '/dip/history',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务平台历程配置
export function delHistory(id) {
  return request({
    url: '/dip/history/' + id,
    method: 'delete'
  })
}
