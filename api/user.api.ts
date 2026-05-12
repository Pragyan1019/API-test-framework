import { APIRequestContext } from "@playwright/test";

export class BaseAPI {
    constructor(
        protected request: APIRequestContext,
        protected baseURL: string
    ){}

    async get<T>(path:string,token?:string):Promise<T>{
        const res = await this.request.get(`${this.baseURL}${path}`,{
            headers: token ?{Authorization: `Bearer ${token}`}:{}
        })
        if(!res.ok()){
            throw new Error(`failed ${res.status()}`);
        }
        return res.json();
    }

    async post<T>(path:string,body:unknown,token:string):Promise<T>{
        const res = await this.request.post(`${this.baseURL}${path}`,{
            data:body,
            headers:{
                'Content-type':'application/json',
                ...(token ?{Authorization: `Bearer ${token}`}:{})
            }
        })
        if(!res.ok()){
            throw new Error(`Failed ${res.status()}`);
        }
        return res.json();
    }

    async delete(path:string,token?:string){
        await this.request.delete(`${this.baseURL}${path}`,{
            headers: token ?{Authorization:`Bearer ${token}`}:{}
        })
    }
}