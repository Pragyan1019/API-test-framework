import {expect,test} from "../fixtures/api.fixture"
import { Auth_Data,UserPayload } from "../data";
import dotenv from "dotenv";


dotenv.config();

test.describe('Authentication',()=>{
    Auth_Data.valid.forEach(({scenario,name,email,password}:UserPayload)=>{
        test(`Valid-${scenario}`,async({userAPI})=>{
            const createUser= await userAPI.create({
                email:email,
                name:name,
                password:password
            })
            expect(createUser).toBeDefined();
        })
    })
    Auth_Data.invalid.forEach(({scenario,name,email,password,expectedError}:UserPayload)=>{
        test(`Invalid-${scenario}`,async({userAPI})=>{
            try {   
                await userAPI.create({
                    email:email,
                    name:name,
                    password:password
                })
            } catch (error:any) {
                expect(error.message).toContain(expectedError!);
            }
        })
    })

})