import request from '@/utils/request'

// 查询平台能力配置列表
export function listPlatformcapability(query) {
  return request({
    url: '/dip/platformcapability/list',
    method: 'get',
    params: query
  })
}

// 查询平台能力配置详细
export function getPlatformcapability(id) {
  return request({
    url: '/dip/platformcapability/' + id,
    method: 'get'
  })
}

// 新增平台能力配置
export function addPlatformcapability(data) {
  return request({
    url: '/dip/platformcapability',
    method: 'post',
    data: data
  })
}

// 修改平台能力配置
export function updatePlatformcapability(data) {
  return request({
    url: '/dip/platformcapability',
    method: 'put',
    data: data
  })
}

// 删除平台能力配置
export function delPlatformcapability(id) {
  return request({
    url: '/dip/platformcapability/' + id,
    method: 'delete'
  })
}
