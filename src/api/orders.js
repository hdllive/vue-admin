import request from '@/utils/request'

export const getOrdersList = ({ pagenum, pagesize }) => {
  return request({
    url: 'orders',
    params: {
      pagenum,
      pagesize
    }
  })
}
