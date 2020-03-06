import MovieTable, { IMovieTableEvents } from '../../components/MovieTable'
import { connect } from 'react-redux'
import { IRootState } from '../../redux/reducers/RootReducer'
import { Dispatch } from 'react'
import MovieAction from '../../redux/actions/MovieAction'
import { IMovieState } from '../../redux/reducers/MoviewReducer'


const mapStateToProps = (state: IRootState): IMovieState => state.movie

const mapDispatchProps = (dispatch: Dispatch<any>): IMovieTableEvents => {
  return {
    onLoad: () => {
      dispatch(MovieAction.fetchMovies({
        page: 1,
        limit: 10,
        key: ""
      }))
    },
    onSwitchChange: (type, newState, id) => {
      dispatch(MovieAction.ChangeSwitch(type, newState, id))
    },
    async onDelete(id) {
      await dispatch(MovieAction.deleteMovie(id))
    },
    onChange(newPage) {
      dispatch(MovieAction.fetchMovies({
        page: newPage
      }))
    },
    onKeyChange(key) {
      dispatch(MovieAction.setConditionAction({
        key
      }))
    },
    onSearch() {
      dispatch(MovieAction.fetchMovies({
        page: 1
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(MovieTable)



//仓库有数据,但没有界面

//MovieTable组件有界面但是没数据Y
