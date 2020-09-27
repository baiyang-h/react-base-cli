import { handleActions } from 'redux-actions'

export const namespace = 'tagsView'

const initState = {
  // 显示的标签页
  visitedViews: []
};

export const tagsViewReducer = handleActions({
  // 添加 visitedView
  ADD_VISITED_VIEW(state, action) {
    const { view } = action.payload
    if(state.visitedViews.some(v => v.path === view.path)) {
      return state
    } else {
      return { ...state, visitedViews: [...state.visitedViews, view]}
    }
  },
  // 关闭 visitedView
  DEL_VISITED_VIEW(state, action) {
    const { path } = action.payload
    return { ...state, visitedViews: state.visitedViews.filter(v => v.path !== path)}
  },
  // 关闭其他 visitedView 排除必显示的(meta.affix===true)
  DEL_OTHERS_VISITED_VIEWS(state, action) {
    const { view } = action.payload
    return { ...state, visitedViews: state.visitedViews.filter(v => v.path === view.path || v.meta && v.meta.affix) }
  },
  // 关闭所有 visitedView 排除必显示的(meta.affix===true)
  DEL_ALL_VISITED_VIEWS(state) {
    return { ...state, visitedViews: state.visitedViews.filter(v => v.meta && v.meta.affix) }
  }
}, initState)
