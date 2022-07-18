import request from '@/utils/request'

/**
 *
 * @returns 获取所有角色列表
 */
export const getRolesAll = () => {
  return request({
    url: 'roles'
  })
}

/**
 *删除角色指定权限
 * @param {角色 ID,权限 ID} param0
 * @returns
 */
export const delRolesItem = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/**
 *
 * @returns 获取树形数据
 */
export const getTreeList = () => {
  return request({
    url: 'rights/tree'
  })
}

// 获取所有权限列表
export const getRightsList = () => {
  return request({
    url: 'rights/list'
  })
}

export const setRolesRights = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: { rids }
  })
}
