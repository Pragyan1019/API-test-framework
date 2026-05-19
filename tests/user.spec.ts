import {expect , test } from "../fixtures/api.fixture"
import { User_Data, UserPayload } from "../data";
import dotenv from "dotenv";

dotenv.config();

test.describe('api login test',async()=>{
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

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
     
    User_Data.getUser.valid.forEach(({scenario})=>{
        test(`[Valid]-${scenario}`,async({userAPI,authToken})=>{
            const getuser= await userAPI.getById(authToken)
            expect(getuser).toBeDefined();
        })
    
        User_Data.getUser.invalid.forEach(({scenario,token,expectedError,userId})=>{
            test(`[Invalid]-${scenario}`,async({userAPI})=>{
                await expect(userAPI.getById(token)).rejects.toThrowError(expectedError);
            })
        })
    })
        User_Data.updateUser.valid.forEach(({scenario,name,email,password,phoneNumber,companyName})=>{
            test(`[Valid]-${scenario}`,async({userAPI})=>{
                    const createUser= await userAPI.create({
                            email,name,password
                    })
                    expect(createUser).toBeDefined();
                    const createdUser = await userAPI.login({
                            email,password
                    });
                    const token =  await createdUser.token;
                    const updateUser = await userAPI.update({name,companyName,phoneNumber},token)
                    expect(updateUser).toBeDefined();
                    await userAPI.deleteMe(token)

            })
        })

        User_Data.updateUser.invalid.forEach(({scenario,name,email,password,phoneNumber,companyName,expectedError})=>{
            test(`[Invalid]-${scenario}`,async({userAPI,authToken})=>{
                    const updateUser = await userAPI.update({name,companyName,phoneNumber},authToken)
                    await expect(updateUser).rejects.toThrowError(expectedError)
            })
        })

        User_Data.deleteUser.valid.forEach(({scenario,name,email,password})=>{
            test(`[Valid]-${scenario}`,async({userAPI})=>{
                        const createUser= await userAPI.create({
                                email,name,password
                        })
                        expect(createUser).toBeDefined();
                        const createdUser = await userAPI.login({
                                email,password
                        });
                        const token =  await createdUser.token;
                    await userAPI.deleteMe(token);
                    await expect(userAPI.getById(token)).rejects.toThrowError();

            })  
        })
        User_Data.deleteUser.invalid.forEach(({scenario,name,email,password,expectedError})=>{
            test(`[Invalidalid]-${scenario}`,async({userAPI})=>{
                        const createUser= await userAPI.create({
                                email,name,password
                        })
                        expect(createUser).toBeDefined();
                        const createdUser = await userAPI.login({
                                email,password
                        });
                        const token =  await createdUser.token;
                    await userAPI.deleteMe(token);
                    await expect(userAPI.getById(token)).rejects.toThrowError();
                    await expect(userAPI.deleteMe(token)).rejects.toThrowError(expectedError);

        })

    })
    })

// test('creating a user', async ({ userAPI, authToken, createdUserIds }) => {
//   const email = `dfghi@gmail.com`;
//   const password = 'Test@1234';

//   // const createdUser = await userAPI.create(
//   //   { email, name: 'ghij', password},
//   //   authToken
//   // );



//   // expect(createdUser).toMatchObject({ email, name: 'ghij'});

//   const fetchedUser = await userAPI.getById( authToken);
//   expect(fetchedUser).toBeDefined();
//   expect(fetchedUser.email).toBe(email);
// });
    // test('creating a user with existing email should fail',async({userAPI})=>{
    //     const createUser = await userAPI.create({
    //         email:"ghijk@gmail.com",
    //         name:"ghijklmno",
    //         password:"helloghikk"
    //     })
    //     await expect(userAPI.create(
    //         {
    //         email:createUser.email,
    //         name:createUser.name,
    //         password:createUser.password,
    //         },
    //     )).rejects.toThrow('400')
    // })

