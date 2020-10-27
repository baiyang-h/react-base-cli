import request, { basePost } from '@/libs/request'

// 登录，获取token
export const getTableData = data => basePost('/table/dynamic-table/getTableData', data);
