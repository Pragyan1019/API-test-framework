import { BaseAPI } from "./base.api";

export interface User{
    id:string,
    email:string,
    name:string,
    role: 'admin'|'customer',
    createdAt: string
}

export class UserAPI extends BaseAPI{
    async create(payload:Omit<User,'id'|'createdAt'>,token:string):Promise<User>{
        return this.post<User>('/users',payload,token);
    }

    async getbyId(id:string,token:string){
        return this.get<User>('/users',token)
    }

    async getAll(token:string){
        return this.get<User>('/user',token);
    }

    async update(id:string,payload: Partial<User>,token:string):Promise<User>{
        const res = await this.request.patch(`${this.baseURL}/users/${id}`,{
            data:'payload',
            headers:{
                Authorization: `Bearer ${token}`;
            }
        })
    if(!res.ok()){
        throw new Error(`Error :${res.status()} `)
    }
    return res.json();
    }
    
    async delete(id:string,token:string):Promise<void>{
        return super.delete(`${this.baseURL}/users/${id}`,token)
    } 

}