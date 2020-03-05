import { combineReducers } from 'redux'
import movie, { IMovieState } from './MoviewReducer'

/**
 * 整个网站的根状态
 */
export interface IRootState {
  movie: IMovieState,
}


export const rootReducer = combineReducers({
  movie
})