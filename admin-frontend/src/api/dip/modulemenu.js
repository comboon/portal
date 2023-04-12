import request from '@/utils/request'

// 查询门户核心服务菜单列表
export function listModulemenu(query) {
  return request({
    url: '/dip/modulemenu/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务菜单详细
export function getModulemenu(id) {
  return request({
    url: '/dip/modulemenu/' + id,
    method: 'get'
  })
}

// 新增门户核心服务菜单
export function addModulemenu(data) {
  return request({
    url: '/dip/modulemenu',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务菜单
export function updateModulemenu(data) {
  return request({
    url: '/dip/modulemenu',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务菜单
export function delModulemenu(id) {
  return request({
    url: '/dip/modulemenu/' + id,
    method: 'delete'
  })
}
