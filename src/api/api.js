import fetch from '@/config/fetch';

// 获取验证码
export const getCode = data => fetch('/sms/verification', data, 'GET');

// 注册
export const register = data => fetch('/user', data, 'POST');

// 登录
export const login = data => fetch('/session', data, 'POST');

// 退出
export const logout = () => fetch('/user', {}, 'DELETE');

// 获取已购订单列表
export const getOrder = () => fetch('/order', {}, 'GET');