import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from 'class-validator'
import { Type, plainToClass } from 'class-transformer'
import { BaseModel } from './BaseModel'
export class Movie extends BaseModel {

  @IsNotEmpty({ message: '电影名称不可以为空' })
  @Type(() => String)
  public name: string
  @IsNotEmpty({ message: '电影类型不可为空' })
  @ArrayMinSize(1, { message: "电影类型至少有一个" })
  @IsArray({ message: "电影类型必须为数组" })
  @Type(() => String)
  public types: string[]

  @IsNotEmpty({ message: '上映地区不可为空' })
  @ArrayMinSize(1, { message: "上映地区至少有一个" })
  @IsArray({ message: "上映地区必须为数组" })
  @Type(() => String)
  public areas: string[]

  @IsNotEmpty({ message: '时长不可以为空' })
  @IsInt({ message: "时长必须是整数" })
  @Min(1, { message: '时长不得少于1分钟' })
  @Max(9999, { message: '时长太长' })
  @Type(() => Number)
  public timeLong: number
  @IsNotEmpty({ message: '是否热映不可以为空' })
  @Type(() => Boolean)
  public isHot: Boolean = false
  @IsNotEmpty({ message: '是否即将上映不可以为空' })
  @Type(() => Boolean)
  public isComing: Boolean = false
  @IsNotEmpty({ message: '是否是经典影片不可以为空' })
  @Type(() => Boolean)
  public isClassic: Boolean = false

  @Type(() => String)
  public description?: string

  @Type(() => String)
  public poster?: string

  /**
   * transform转换平面对象为Movie类
   * @param plainObject 平面对象
   */
  public static transform(plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject)
  }

}