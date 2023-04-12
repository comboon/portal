import request from '@/utils/request'

//查询门户核心服务解决方案配置的菜单名称列表
export function listModuleMenu(){
  return request({
    url: "/dip/modulemenu/getList/" + 1,
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

// 查询门户核心服务解决方案配置列表
export function listSolution(query) {
  return request({
    url: '/dip/solution/list',
    method: 'get',
    params: query
  })
}
//查询所有解决方案
export function getSolutionTypes(query) {
  return request({
    url: '/dip/solution/getAll',
    method: 'get'
  })
}

// 查询门户核心服务解决方案配置详细
export function getSolution(id) {
  return request({
    url: '/dip/solution/' + id,
    method: 'get'
  })
}

// 新增门户核心服务解决方案配置
export function addSolution(data) {
  return request({
    url: '/dip/solution',
    method: 'post',
    data: data
  })
}

// 修改门户核心服务解决方案配置
export function updateSolution(data) {
  return request({
    url: '/dip/solution',
    method: 'put',
    data: data
  })
}

// 删除门户核心服务解决方案配置
export function delSolution(id) {
  return request({
    url: '/dip/solution/' + id,
    method: 'delete'
  })
}
