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