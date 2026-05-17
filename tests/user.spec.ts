import {expect , test } from "../fixtures/api.fixture"
import dotenv from "dotenv";

dotenv.config();

test.describe('api login test',async()=>{
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD
test('creating a user', async ({ userAPI, authToken, createdUserIds }) => {
  const email = ``;
  const password = '';

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
            email:"",
            name:"",
            password:""
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