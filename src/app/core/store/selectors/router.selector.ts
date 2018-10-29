import { createSelector } from '@ngrx/store';
import { getRouterParams, getRouterUrl, selectRouterState } from '../reducers';

export const selectRouterParams = createSelector(
  selectRouterState,
  getRouterParams
);

export const selectRouterUrl = createSelector(
  selectRouterState,
  getRouterUrl
);
