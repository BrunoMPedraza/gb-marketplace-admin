import { translationsFormat } from "../mocks/interfaces";
import { contentObj } from "../store";
import { ApiResponse, HttpMethod } from "./shared/rest.interfaces";
import { rest } from "./shared/rest.services";

export async function getTranslations(token:string):Promise<ApiResponse<contentObj[]>>{
    const endpoint = 'translations';
    const headers = { token }
    try {
        const response = await rest<any>(HttpMethod.GET, endpoint, headers);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export async function putTranslations(token:string, payload: contentObj[]):Promise<ApiResponse<contentObj[]>>{
    const endpoint = 'translations/update';
    const headers = { token }
    try {
        const response = await rest<any>(HttpMethod.PUT, endpoint, headers, payload);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}