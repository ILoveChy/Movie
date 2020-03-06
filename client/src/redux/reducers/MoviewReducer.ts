import { IMovie } from "../../services/MovieServices";
import { ISearchCondition } from "../../services/CommonTypes";
import { MovieActions, SaveMovieActionType, SetConditionActionType, DeleteMoviesActionType, SetLoadingActionType, ChangeSwitchActionType } from "../actions/MovieAction";
import { Reducer } from "react";
/**
 * 描述电影列表的状态类型
 */
export type IMovieCondition = Required<ISearchCondition>

type MovieReducer<A> = Reducer<IMovieState, A>

export interface IMovieState {
  /**
   * 电影数组
   */
  data: IMovie[]
  /**
   * 查询条件
   */
  condition: IMovieCondition
  /**
   * 总记录数
   */
  count: number
  /**
   * 是否正在加载数据
   */
  isLoading: boolean
  /**
   * 总页数
   */
  countPage: number
}

const defaultState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 5,
    key: ''
  },
  count: 0,
  isLoading: false,
  countPage: 0
}



const saveMovie: MovieReducer<SaveMovieActionType> = (state, action) => {
  return {
    ...state,
    data: action.payload.movies,
    count: action.payload.count,
    countPage: Math.ceil(action.payload.count / state.condition.limit)
  }
}

const setCondition: MovieReducer<SetConditionActionType> = (state, action) => {
  const newState = {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload
    }
  }
  newState.countPage = Math.ceil(newState.count / newState.condition.limit)
  return newState
}
const setMovieLoading: MovieReducer<SetLoadingActionType> = (state, action) => {
  return {
    ...state,
    isLoading: action.payload
  }
}
const deleteMovie: MovieReducer<DeleteMoviesActionType> = (state, action) => {
  return {
    ...state,
    data: state.data.filter(m => m._id !== action.payload),
    count: state.count - 1,
    countPage: Math.ceil((state.count - 1) / state.condition.limit)
  }
}
const changeSwitch: MovieReducer<ChangeSwitchActionType> = (state, action) => {
  // action.payload.newVal
  //根据id找到对象
  const movie = state.data.find(d => d._id === action.payload.id)
  if (!movie) {
    return state
  }
  const newMovie = { ...movie };
  newMovie[action.payload.type] = action.payload.newVal
  const newData = state.data.map(d => {
    if (d._id === action.payload.id) {
      return newMovie
    } else {
      return d
    }
  })
  return {
    ...state,
    data: newData
  }
}
export default function (state: IMovieState = defaultState, action: MovieActions) {
  switch (action.type) {
    case "movie_save":
      return saveMovie(state, action)
    case "movie_delete":
      return deleteMovie(state, action)
    case "movie_setCondition":
      return setCondition(state, action)
    case "movie_setLoading":
      return setMovieLoading(state, action)
    case "movie_switch":
      return changeSwitch(state, action)
    default:
      return state;
  }
}