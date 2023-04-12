import request from '@/utils/request'
export function getHomeDataInfor() {
    return request({
      url: '/dip/index/info',
      method: 'get',
    })
  }