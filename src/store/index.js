/**
 * 状态管理
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import userSaga  from './modules/user/saga'

import { namespace as appNamespace, appReducer } from './modules/app/reducer'
import { namespace as userNamespace, userReducer } from './modules/user/reducer'

const reducers = combineReducers({
  [appNamespace]: appReducer,
  [userNamespace]: userReducer
})

// 浏览器redux查看插件
const reduxDebug = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

/*
compose(fn1, fn2):
  ƒ () {
    return a(b.apply(void 0, arguments));
  }
*/

// export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      /*sagaMiddleware*/
    ),
    reduxDebug
  )
)

// export function* rootSaga() {
//   yield all([
//     ...userSaga,
//   ])
// }

// sagaMiddleware.run(rootSaga);

export default store



