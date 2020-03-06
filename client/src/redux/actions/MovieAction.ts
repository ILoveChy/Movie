import { IAction } from './ActionTypes'
import { IMovie, MovieService } from '../../services/MovieServices'
import { ISearchCondition, SwitchType } from '../../services/CommonTypes'
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../reducers/RootReducer'
export type SaveMovieActionType = IAction<"movie_save", {
  movies: IMovie[],
  count: number
}>
export type MovieThunk = ThunkAction<Promise<void>, IRootState, any, MovieActions>
export type SetLoadingActionType = IAction<"movie_setLoading", boolean>

export type SetConditionActionType = IAction<"movie_setCondition", ISearchCondition>

export type DeleteMoviesActionType = IAction<"movie_delete", string>

export type ChangeSwitchActionType = IAction<"movie_switch", {
  type: SwitchType,
  newVal: boolean,
  id: string
}>
function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): ChangeSwitchActionType {
  return {
    type: "movie_switch",
    payload: {
      type,
      newVal,
      id
    }
  }
}
function saveMoviesAction(movies: IMovie[], count: number): SaveMovieActionType {
  return {
    type: "movie_save",
    payload: {
      movies,
      count
    }
  }
}

function setLoadingAction(isLoading: boolean): SetLoadingActionType {
  return {
    type: "movie_setLoading",
    payload: isLoading
  }
}

function setConditionAction(condition: ISearchCondition): SetConditionActionType {
  return {
    type: "movie_setCondition",
    payload: condition

  }
}


function deleteMoviesAction(id: string): DeleteMoviesActionType {
  return {
    type: "movie_delete",
    payload: id
  }
}


export type MovieActions = SaveMovieActionType | SetLoadingActionType | SetConditionActionType | DeleteMoviesActionType | ChangeSwitchActionType

//根据条件从服务器获取电影数据
function fetchMovies(condition: ISearchCondition): MovieThunk {
  return async (dispatch, getState) => {
    //1. 设置加载状态
    dispatch(setLoadingAction(true));
    //2. 设置条件
    dispatch(setConditionAction(condition));
    //3. 获取服务器数据
    const curCondition = getState().movie.condition
    const res = await MovieService.getMovies(curCondition)
    //4. 更改仓库数据
    console.log(res);

    dispatch(saveMoviesAction(res.data, res.count))
    //关闭加载状态
    dispatch(setLoadingAction(false));
  }
}
function deleteMovie(id: string): MovieThunk {
  return async dispatch => {
    dispatch(setLoadingAction(true));
    await MovieService.delete(id)
    dispatch(deleteMoviesAction(id));//删除本地仓库中的数据
    dispatch(setLoadingAction(false));
  }
}
function ChangeSwitch(type: SwitchType, newVal: boolean, id: string): MovieThunk {
  return async dispatch => {
    dispatch(changeSwitchAction(type, newVal, id));
    await MovieService.update(id, {
      [type]: newVal
    })
  }
}


export default {
  saveMoviesAction,
  setLoadingAction,
  setConditionAction,
  deleteMoviesAction,
  changeSwitchAction,
  fetchMovies,
  deleteMovie,
  ChangeSwitch
}