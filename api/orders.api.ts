import { BaseAPI } from "./user.api";

export interface Order{
    id:string,
    userId: string,
    items: {productId: string , qty: string}[];
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    total: number
}

export class OrderAPI extends BaseAPI{
    async create(payload: Omit<Order, 'id'|'status'|'total'>,token: string):Promise<Order>{
        return this.post<Order>('/orders',payload,token)
    }

    async getbyId(id:string,token:string):Promise<Order>{
        return this.get<Order>('/order/${id}',token)
    }

    async updateStatus<T>(id:string,status:Order['status'],token:string):Promise<Order>{
        const res = await this.request.patch(`/orders/${id}/status`,{
            data:{status},
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(!res.ok()){
            throw new Error(`Failed: ${res.status()}`)
        }
        return res.json();
    }

    async delete(id:string,token:string):Promise<void>{
        return super.delete(`/orders/${id}`,token);
    }
}