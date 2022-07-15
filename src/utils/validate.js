/**
 *校验手机号
 * @param {手机号} moblie
 * @returns
 */
export const validateMoblie = (moblie) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(moblie)
}
