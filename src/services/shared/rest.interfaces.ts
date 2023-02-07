import { AxiosResponseHeaders } from "axios";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: AxiosResponseHeaders | unknown;
}