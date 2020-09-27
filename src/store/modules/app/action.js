import { createActions } from 'redux-actions';

export const { setActiveRoute, setMatchRoutes } = createActions({
  SET_ACTIVE_ROUTE: route => ({ route }),
  SET_MATCH_ROUTES: matchRoutes => ({ matchRoutes })
});
