export interface IResError {

  err: string[];
  data: null;
}

export interface IResData<T> {

  err: "";
  data: T;
}

export interface IResPageData<T> {

  err: ""
  count: number;//数据总数
  data: T[];//查询的数据
}

export interface ISearchCondition {
  page?: number,
  limit?: number,
  key?: string
}
export enum SwitchType {
  isHot = "isHot",
  isComing = "isComing",
  isClassic = "isClassic"
}