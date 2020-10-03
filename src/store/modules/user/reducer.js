import {handleActions, createAction} from "redux-actions";
import { getToken } from '@/libs/token'
import { resolveReducerName } from '@/libs/method'

export const namespace = 'user';

const LOGIN = resolveReducerName(namespace, 'LOGIN')
const SET_USER = resolveReducerName(namespace, 'SET_USER')
const LOGIN_OUT = resolveReducerName(namespace, 'LOGIN_OUT')

// Action Creators
export const loginActions = createAction(LOGIN)
export const setUserActions = createAction(SET_USER)
export const loginOutActions = createAction(LOGIN_OUT)

const initState = {
  token: getToken(),
  roles: [],
  admin: {}
};

export const userReducer = handleActions({
  [loginActions](state, action) {
    const { token } = action.payload
    return { ...state, token }
  },
  [setUserActions](state, action) {
    const { roles, admin } = action.payload
    return {
      ...state,
      roles,
      admin
    }
  },
  [loginOutActions](state, action) {
    return {
      token: null,
      roles: [],
      admin: {}
    }
  }
}, initState)