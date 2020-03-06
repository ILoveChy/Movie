export interface IResError {

  errors: string[];
  data: null;
}

export interface IResData<T> {

  errors: "";
  data: T[];
}

export interface IResPageData<T> {

  errors: ""
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