import {expect , test } from "../fixtures/api.fixture"
import { User_Data, UserPayload } from "../data";
import dotenv from "dotenv";

dotenv.config();

test.describe('api login test',async()=>{
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // test('create user with valid payload returns 201')
    // test('create user with duplicate email returns 409')
    // test('create user with missing name returns 400')
    // test('create user with name too short returns 400')        
    // test('create user with name too long returns 400')         
    // test('create user with missing password returns 400')
    // test('create user with password too short returns 400')  
    // test('create user with invalid email format returns 400')

    // test('get user by valid id returns correct user')
    // test('get user by non-existent id returns 404')
    // test('get user without token returns 401')

    // test('update user name succeeds')
    // test('update user with invalid token returns 401')

    // test('delete user removes account')
    // test('delete user twice returns 404')  
    User_Data.createUser.valid.forEach(({scenario,name,email,password}:UserPayload)=>{
        test(`[Valid]-${scenario}`,async({userAPI})=>{
            const user = await userAPI.create({email,name,password})
            expect(user.email).toMatchObject({email})
        })
    })  
    User_Data.createUser.invalid.forEach(({scenario,name,email,password,expectedError})=>{
        test(`[Invalid]-${scenario}`,async({userAPI})=>{
                try {   
                await userAPI.create({
                    email,name,password
                })
            } catch (error:any) {
                expect(error.message).toContain(expectedError!);
            }
        })
    })
     
    User_Data.getUser.valid.forEach(({scenario,token,userId})=>{
        test(`[Valid]-${scenario}`,async({userAPI,authToken})=>{
            const getuser= await userAPI.getById(authToken)
            expect(getuser).toBeDefined();
        })
    
        User_Data.getUser.invalid.forEach(({scenario,token,expectedError,userId})=>{
            test(`[Invalid]-${scenario}`,async({userAPI})=>{
                try{
                    const getinvaliduser = await userAPI.getById(token);
                }catch(err:any){
                    expect(err.message).toContain(expectedError!)
                }    
            })
        })

        User_Data.updateUser.valid.forEach(({scenario,token,name,phoneNumber,companyName})=>{
            test(`[Valid]-${scenario}`,async({userAPI,authToken})=>{
                
            })
        })

    })


test('creating a user', async ({ userAPI, authToken, createdUserIds }) => {
  const email = `dfghi@gmail.com`;
  const password = 'Test@1234';

  // const createdUser = await userAPI.create(
  //   { email, name: 'ghij', password},
  //   authToken
  // );



  // expect(createdUser).toMatchObject({ email, name: 'ghij'});

  const fetchedUser = await userAPI.getById( authToken);
  expect(fetchedUser).toBeDefined();
  expect(fetchedUser.email).toBe(email);
});
    test('creating a user with existing email should fail',async({userAPI})=>{
        const createUser = await userAPI.create({
            email:"ghijk@gmail.com",
            name:"ghijklmno",
            password:"helloghikk"
        })
        await expect(userAPI.create(
            {
            email:createUser.email,
            name:createUser.name,
            password:createUser.password,
            },
        )).rejects.toThrow('400')
    })

})