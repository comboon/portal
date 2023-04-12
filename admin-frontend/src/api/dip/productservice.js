import request from '@/utils/request'

//查询门户核心服务产品服务配置的菜单名称列表
export function listModuleMenu(){
  return request({
    url: "/dip/modulemenu/getList/" + 0,
    method: "get"
  })
}
export function listModulemenu(query) {
  return request({
    url: '/dip/modulemenu/list',
    method: 'get',
    params: query
  })
}
export function getAllServiceType(){
  return request({
    url: "/dip/productservice/getAll" ,
    method: "get"
  })
}

//查询所有已上架市场元素
export function getAllPublishElement(){
  return request({
    url: "/dip/marketelement/getAllPublishElements",
    method: "get"
  })
}

// 查询门户核心服务产品服务配置列表
export function listProductservice(query) {
  return request({
    url: '/dip/productservice/list',
    method: 'get',
    params: query
  })
}

// 查询门户核心服务产品服务配置详细
export function getProductservice(id) {
  return request({
    url: '/dip/productservice/' + id,
    method: 'get'
  })
}

// 新增门户核心服务产品服务配置
export function addProductservice(data) {
  return request({
    url: '/dip/productservice',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务产品服务配置
export function updateProductservice(data) {
  return request({
    url: '/dip/productservice',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务产品服务配置
export function delProductservice(id) {
  return request({
    url: '/dip/productservice/' + id,
    method: 'delete'
  })
}
