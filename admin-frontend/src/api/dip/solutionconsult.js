import request from '@/utils/request'

// 查询门户核心服务解决方案咨询列表
export function listSolutionconsult(query) {
  return request({
    url: '/dip/solutionconsult/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务解决方案咨询详细
export function getSolutionconsult(id) {
  return request({
    url: '/dip/solutionconsult/' + id,
    method: 'get'
  })
}

// 新增门户核心服务解决方案咨询
export function addSolutionconsult(data) {
  return request({
    url: '/dip/solutionconsult',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务解决方案咨询
export function updateSolutionconsult(data) {
  return request({
    url: '/dip/solutionconsult',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务解决方案咨询
export function delSolutionconsult(id) {
  return request({
    url: '/dip/solutionconsult/' + id,
    method: 'delete'
  })
}
