import {
  ActionReducerMap,
  MetaReducer, createFeatureSelector,
} from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import { environment as env } from '@app/env';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { logger } from '../meta-reducers';
import { RouterStateModel } from '../../router';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  router: RouterReducerState<RouterStateModel>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !env.production
  ? [logger, storeFreeze]
  : [];


export const getRouterParams = (router: RouterReducerState<RouterStateModel>) => router.state.params;
export const getRouterUrl = (router: RouterReducerState<RouterStateModel>) => router.state.url;

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateModel>>('router');

