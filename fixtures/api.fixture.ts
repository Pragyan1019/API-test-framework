import { test as baseTest, request } from "@playwright/test";
import { BaseAPI } from "../api/base.api";
import { OrderAPI } from "../api/orders.api";
import { UserAPI } from "../api/users.api";
import "dotenv/config";

declare const process: { env: { BASE_URL: string,TEST_USER_EMAIL:string,TEST_USER_PASSWORD:string } };

type Apifixtures = {
  orderAPI: OrderAPI;
  baseAPI: BaseAPI;
  userAPI: UserAPI;
  authToken: string;
  createdOrderIds: string[];
};

export const test = baseTest.extend<Apifixtures>({
  authToken: async ({ request }, use) => {
    const res = await request.post(`${process.env.BASE_URL}/auth/login`,{
        data:{
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD
        }
    });
    const { token } = await res.json();
    await use(token);
  },

  userAPI: async({request},use)=>{
    const baseURL = process.env.BASE_URL;
    await use(new UserAPI(request,baseURL))
  },

  orderAPI: async({request},use)=>{
    const baseURL = process.env.BASE_URL;
    await use(new OrderAPI(request,baseURL))
 },
 createdOrderIds: async({orderAPI,authToken},use)=>{
    const ids: string[] = [];
    await use(ids);
    await Promise.all(ids.map(id=>orderAPI.delete(id,authToken)))
 }
});

export { expect } from "@playwright/test";