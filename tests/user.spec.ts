import {expect , test } from "../fixtures/api.fixture"

test.describe('api login test',async()=>{
test('creating a user', async ({ userAPI, authToken, createdUserIds }) => {
  // Unique email per run — never collides with previous runs
  const email = ``;
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


})