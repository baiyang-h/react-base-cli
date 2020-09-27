import { createActions } from 'redux-actions';

export const { addVisitedView, delVisitedView, delOthersVisitedViews, delAllVisitedViews } = createActions({
  // 添加 visitedView
  ADD_VISITED_VIEW: view => ({ view }),
  // 关闭 visitedView
  DEL_VISITED_VIEW: path => ({ path }),
  // 关闭其他 visitedView 排除必显示的(meta.affix===true)
  DEL_OTHERS_VISITED_VIEWS: view => ({ view }),
},
  // 关闭所有 visitedView 排除必显示的(meta.affix===true)
  'DEL_ALL_VISITED_VIEWS'
)
