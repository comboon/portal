import request from '@/utils/request'

// 查询市场元素配置列表
export function listMarketelement(query) {
  return request({
    url: '/dip/marketelement/list',
    method: 'get',
    params: query
  })
}

// 查询市场元素配置详细
export function getMarketelement(id) {
  return request({
    url: '/dip/marketelement/' + id,
    method: 'get'
  })
}

// 新增市场元素配置
export function addMarketelement(data) {
  return request({
    url: '/dip/marketelement',
    method: 'post',
    data: data
  })
}

// 修改市场元素配置
export function updateMarketelement(data) {
  return request({
    url: '/dip/marketelement',
    method: 'put',
    data: data
  })
}

// 删除市场元素配置
export function delMarketelement(id) {
  return request({
    url: '/dip/marketelement/' + id,
    method: 'delete'
  })
}
//上架市场元素配置
export function publishMarketelement(id) {
  return request({
    url: '/dip/marketelement/publish/' + id,
    method: 'post'
  })
}
//下架市场元素配置
export function unpublishMarketelement(id) {
  return request({
    url: '/dip/marketelement/unpublish/' + id,
    method: 'post'
  })
}
export function getDictInfo(lanType) {
  return request({
    url: '/dip/tag/getDictInfo?lanType='+lanType,
    method: 'get'
  })
}
export function getModelList() {
  return request({
    url: '/dip/marketelement/getModelList',
    method: 'get'
  })
}
export function getVersionList(modelId) {
  return request({
    url: '/dip/marketelement/getVersionList?modelId='+modelId,
    method: 'get'
  })
}
//获取元素规格列表
export function getCatalogLists(query) {
  return request({
    url: '/dip/marketelement/catalog',
    method: 'get',
    params: query
  })
}

