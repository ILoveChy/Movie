import Axios from 'axios'
import { IResData, IResError, ISearchCondition, IResPageData } from './CommonTypes'


export interface IMovie {
  _id?: string
  name: string
  types: string[]
  areas: string[]
  timeLong: number
  isHot: Boolean
  isComing: Boolean
  isClassic: Boolean
  description?: string
  poster?: string
}
export class MovieService {
  public static async add(movie: IMovie): Promise<IResData<IMovie> | IResError> {
    const { data } = await Axios.post('/api/movie', movie)
    return data
  }
  public static async update(id: string, movie: Partial<IMovie>): Promise<IResData<true> | IResError> {
    const { data } = await Axios.put(`/api/movie/${id}`, movie)
    return data
  }
  public static async delete(id: string): Promise<IResData<true> | IResError> {
    const { data } = await Axios.delete(`/api/movie/${id}`)
    return data
  }
  public static async getMovieById(id: string): Promise<IResData<IMovie> | null> {
    const { data } = await (await Axios.get(`/api/movie/${id}`))
    return data
  }
  public static async getMovies(condition: ISearchCondition): Promise<IResPageData<IMovie>> {
    const { data } = await Axios.get(`/api/movie/`, {
      params: condition
    })
    return data
  }

}
