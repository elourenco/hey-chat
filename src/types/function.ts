export interface IError {
  code: string;
  message: string;
  originError?: unknown;
}

export interface IResult<T> {
  data?: T;
  error?: IError;
}
