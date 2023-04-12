import request from '@/utils/request'

// 查询门户核心服务合作伙伴配置列表
export function listParter(query) {
  return request({
    url: '/dip/parter/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务合作伙伴配置详细
export function getParter(id) {
  return request({
    url: '/dip/parter/' + id,
    method: 'get'
  })
}

// 新增门户核心服务合作伙伴配置
export function addParter(data) {
  return request({
    url: '/dip/parter',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务合作伙伴配置
export function updateParter(data) {
  return request({
    url: '/dip/parter',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务合作伙伴配置
export function delParter(id) {
  return request({
    url: '/dip/parter/' + id,
    method: 'delete'
  })
}
