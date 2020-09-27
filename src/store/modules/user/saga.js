import { takeEvery, fork, put, call, delay } from 'redux-saga/effects'
import {dispatchLogin, login, dispatchGetInfo, getInfo, dispatchLoginOut, loginOut} from "./action";
import { request_login, request_getInfo } from "@/services/user";
import { setToken, removeToken } from "@/utils/token";
import { message } from "antd";
import history from "@/router/history";

// 登录系统
function *sagaLogin(action) {
  const { password, username } = action.payload
  try {
    const { data } = yield request_login({ password, username })
    if(data.success) {
      // 1. 在 cookie 中设置 token   2. reducer 中保存 token
      setToken(data.data.token);
      yield put(login(data.data.token))
      history.push('/');
    } else {
      message.error(data.message);
    }
  } catch (e) {
    console.log(e)
  }
}

// 得到用户信息
function *sagaGetInfo({ payload }) {
  try {
    const { data } = yield call(request_getInfo, payload)
    if(data.success) {
      yield delay(1000)
      yield put(getInfo({
        roles: data.data.roles,
        admin: data.data
      }))
    } else {
      message.error(data.message);
    }
  } catch (e) {
    message.error(e);
    yield put(dispatchLoginOut())
  }
}

// 退出系统
function *sagaLoginOut() {
  removeToken()
  yield put(loginOut())
  history.push('/login')
}

function* watchCommon() {
  yield takeEvery(dispatchLogin, sagaLogin)
  yield takeEvery(dispatchGetInfo, sagaGetInfo)
  yield takeEvery(dispatchLoginOut, sagaLoginOut)
}

export default [fork(watchCommon)]
