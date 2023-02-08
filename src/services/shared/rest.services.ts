import axios, { AxiosResponse } from "axios";
import { ApiResponse, HttpMethod } from "./rest.interfaces";
const { REACT_APP_API_BASE_URL } = process.env
let baseURL = REACT_APP_API_BASE_URL
  if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://localhost:3000/'
  }
export async function rest<T>(
  method: HttpMethod,
  url: string,
  headers?: Record<string, string>,
  data?: any
): Promise<ApiResponse<T>> {
  const fullUrl = `${baseURL}${url}`
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: fullUrl,
      data,
      headers: {
        ...headers,
      },
    });
    return {
      data: response.data,
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    throw error;
  }
}