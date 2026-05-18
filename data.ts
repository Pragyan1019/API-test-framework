export const  testData = {
    create(){
        return{
            userId: "12345",
            items:[
                {productId:"123",qty:1},
                {productId:"456",qty:2},
                {productId:"789",qty:3}
            ],
            shippingAddress:{
                street:"123 Main St",
                city:"Anytown",
                zip:"12345"
            }
        
        }
    }
}

import authData from "./data/auth.data.json"
import userData from "./data/user.data.json"

export interface UserPayload{
    scenario:string,
    name:string,
    email:string,
    password:string,
    expectedError?:string,
}

export const Auth_Data = authData.createUser;
export const User_Data = userData;