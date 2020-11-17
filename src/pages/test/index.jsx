import React from "react";
import {Button, message, Modal, Space} from 'antd';
import axios from 'axios'
import { request_err404, request_err500 } from '@/services/test'
import { http_getTableData, http_getTableData2 } from '@/services/table'

const CancelToken = axios.CancelToken;
let cancel;

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

  const getTableData1 = () => {
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

  const getTableData2 = () => {
    http_getTableData2('', {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
    }).then(r => {
      console.log(r)
      message.success(r.data.message)
    })
  }

  const abort = () => {
    if(cancel) {
      message.info('已将 请求数据2 接口请求中断')
      cancel()
    }
  }

  return <Space>
    <Button type="primary" onClick={handleError404}>请求返回404</Button>
    <Button type="primary" onClick={handleError500}>请求返回500</Button>
    <Button type="primary" onClick={getTableData1}>请求数据1</Button>
    <Button type="primary" onClick={getTableData2}>请求数据2</Button>
    <Button type="primary" onClick={abort}>请求终端（请求数据2）</Button>
  </Space>
}
