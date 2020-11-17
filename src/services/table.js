import request, { basePost } from '@/libs/request'

// 登录，获取token
export const http_getTableData = (data, config) => basePost('/table/dynamic-table/getTableData', data, config);

export const http_getTableData2 = (data, config) => basePost('/table/page-table/getTableData', data, config);
