import React from "react";
import {Button, message, Modal, Space} from 'antd';
import { request_err404, request_err500 } from '@/services/test'
import { http_getTableData } from '@/services/table'

export default function Test() {

  const handleError404 = () => {
    request_err404().then(r => {
      console.log(r)
    }).catch(e => {
      console.log('catch一下信息', e)
    })
  }

  const handleError500 = () => {
    request_err500().then(r => {
      console.log(r)
    })
  }

  const getTableData = () => {
    http_getTableData('', {
      validateStatus(status) {
        console.log(status)
        Modal.warning({
          title: '如果我返回一个 false， 则该请求虽然成功了，但是我让其走失败的axios了',
        });
        return false     //  如果我返回一个 false， 则该请求虽然成功了，但是我让其走失败的axios了
      }
    }).then(r => {
      console.log(r)
      message.success(r.data.message)
    })
  }

  return <Space>
    <Button type="primary" onClick={handleError404}>请求返回404</Button>
    <Button type="primary" onClick={handleError500}>请求返回500</Button>
    <Button type="primary" onClick={getTableData}>请求数据</Button>
  </Space>
}
