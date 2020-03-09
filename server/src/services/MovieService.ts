import { Movie } from "../model/Movie";
import { IMovie } from '../db/MovieSchema'
import { MovieModel } from "../db";
import { SerachCondition } from "../model/SearchCondition";
import { ISearchResult } from "../model/CommonTypes";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    //1. 转换类型
    movie = Movie.transform(movie)
    //2. 数据验证
    const err = await movie.validateThis()
    if (err.length > 0) {
      return err
    }
    //3. 添加到数据库
    const result = await MovieModel.create(movie)
    return result
  }
  public static async update(id: string, movie: Movie): Promise<string[]> {
    const movieObj = Movie.transform(movie)
    const err = await movieObj.validateThis(true)
    if (err.length > 0) {
      return err
    }
    // 修改数据库
    await MovieModel.updateOne({ _id: id }, movie);
    return err;
  }
  public static async delete(id: string) {
    await MovieModel.deleteOne({ _id: id })
  }
  public static async findById(id: string): Promise<IMovie | null> {
    const result = await MovieModel.findById(id);
    return result
  }
  /**
   * 
   * @param conditon page\limit\key
   */
  public static async find(condition: SerachCondition): Promise<ISearchResult<IMovie>> {
    //1. 转换类型
    condition = SerachCondition.transform(condition)
    //2. 数据验证
    const errors = await condition.validateThis()
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors
      }
    }
    // 3. 查询
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(condition.key) }
    }).skip((condition.page - 1) * condition.limit).limit(condition.limit)
    const count = await MovieModel.find({
      name: { $regex: new RegExp(condition.key) }
    }).countDocuments();
    return {
      count,
      data: movies,
      errors: []
    }
  }
}