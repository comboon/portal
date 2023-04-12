import request from '@/utils/request'

// 查询后台服务市场元素申请列表
export function listMarketelementapply(query) {
  return request({
    url: '/dip/marketelementapply/list',
    method: 'get',
    params: query
  })
}

// 查询后台服务市场元素申请详细
export function getMarketelementapply(id) {
  return request({
    url: '/dip/marketelementapply/' + id,
    method: 'get'
  })
}

// 新增后台服务市场元素申请
export function addMarketelementapply(data) {
  return request({
    url: '/dip/marketelementapply',
    method: 'post',
    data: data
  })
}

// 市场元素申请审核
export function auditMarketelementapply(data) {
  return request({
    url: '/dip/marketelementapply/audit',
    method: 'post',
    data: data
  })
}

// 删除后台服务市场元素申请
export function delMarketelementapply(id) {
  return request({
    url: '/dip/marketelementapply/' + id,
    method: 'delete'
  })
}
