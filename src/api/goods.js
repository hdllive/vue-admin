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

// 图片上传
export const imgUpload = file => {
  return request({
    method: 'POST',
    url: 'upload',
    data: file
  })
}

// 编辑提交参数
export const setAttributes = ({ id, attrId, attrName, attrSel, attrVals }) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${attrId}`,
    data: {
      attr_name: attrName,
      attr_sel: attrSel,
      attr_vals: attrVals
    }
  })
}

// 添加动态参数或者静态属性
export const addAttributes = ({ id, attrName, attrSel, ttrVals }) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data: {
      attr_name: attrName,
      attr_sel: attrSel,
      attr_vals: ttrVals
    }
  })
}

// 添加商品
export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}

// 删除参数
export const delGoodsAttributes = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}

// 编辑提交参数
export const setGoodsAttributes = (data) => {
  return request({
    method: 'PUT',
    url: `categories/${data.id}/attributes/${data.attrId}`,
    data
  })
}

//  添加分类
export const addCategories = (data) => {
  return request({
    method: 'POST',
    url: 'categories',
    data
  })
}
