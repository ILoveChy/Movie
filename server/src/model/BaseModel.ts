import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseModel {
  /**
   * 验证当前电影对象
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipUndefinedProperties: skipMissing
    });
    const temp = errors.map((item) => Object.values(item.constraints))
    const reuslt: string[] = []
    temp.forEach(item => {
      reuslt.push(...item)
    })
    return reuslt
  }
  /**
   * transform转换平面对象为类
   * @param plainObject 平面对象
   * @param cls 类名
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject)
  }
}