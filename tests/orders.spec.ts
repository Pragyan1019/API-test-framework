import {expect,test} from "../fixtures/api.fixture";
import { testData } from "../data";
import {}

test.describe("Orders API",async()=>{

    test('create order',async({orderAPI,authToken,createdOrderIds})=>{
        const order =  await orderAPI.create(testData.create(),authToken);
    })
})