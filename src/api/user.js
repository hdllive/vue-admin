import request from '@/utils/request'

// 登录接口
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

// 获取用户列表
export const getUsers = (params) => {
  return request({
    url: 'users',
    params
  })
}

/**
 *修改用户状态
 * @param {id,状态} param0
 * @returns
 */
export const updateUsers = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

/**
 *添加用户
 * @param {用户名称，用户密码，邮箱，手机号} param0
 * @returns
 */
export const addUsers = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

/**
 *编辑用户提交
 * @param {用户id,用户 id,手机号} param0
 * @returns
 */
export const updateUsersForm = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      id,
      email,
      mobile
    }
  })
}

/**
 *删除单个用户
 * @param {用户id} id
 * @returns
 */
export const delUsersForm = ({ id }) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

/**
 *获取角色列表
 * @returns
 */
export const getUsersRoles = () => {
  return request({
    url: 'roles'
  })
}

/**
 *设置用户角色
 * @param {用户ID,角色 id} param0
 * @returns
 */
export const setUsersForm = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

/**
 * 用户数据列表(搜索和分页)
 * @param {查询参数，当前页码，每页显示条数} param0
 * @returns
 */
export const getyserTableId = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query, pagenum, pagesize
    }
  })
}
