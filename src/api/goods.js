import request from '@/utils/request'

/**
 *商品列表数据
 * @param {查询参数,当前页码,每页显示条数} data
 * @returns
 */
export const getGoodsList = (data) => {
  return request({
    url: 'goods',
    params: data
  })
}

// 根据 ID 查询商品
export const searchGoodsId = (id) => {
  return request({
    url: `goods/${id}`
  })
}

// 商品分类数据列表
export const getAategoriesList = (params) => {
  return request({
    url: 'categories',
    params
  })
}

// 商品分类参数管理
export const getAttributes = ({ id, sel }) => {
  return request({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
