// fixtures/api.fixture.ts
import { test as baseTest } from "@playwright/test";
import { BaseAPI } from "../api/base.api";
import { OrderAPI } from "../api/orders.api";
import { UserAPI } from "../api/users.api";


type ApiFixtures = {
  orderAPI: OrderAPI;
  baseAPI: BaseAPI;
  userAPI: UserAPI;
  authToken: string;
  createdOrderIds: string[];
  createdUserIds: string[];
};

export const test = baseTest.extend<ApiFixtures>({
  authToken: async ({ request }, use) => {
    const res = await request.post(
      "https://practice.expandtesting.com/notes/api/users/login",
      {
        data: {
          email: "",
          name: "mnopqrst",
          password: "",
        },
      }
    );

    const body = await res.json();

    if (!res.ok()) {
      throw new Error(
        `Login failed [${res.status()}]: ${JSON.stringify(body)}`
      );
    }
    console.log("Received auth token:", body.data.token); // Debug log for token
    await use(body.data.token);
  },

  userAPI: async ({ request }, use) => {
    await use(new UserAPI(request, process.env.BASE_URL!));
  },

  orderAPI: async ({ request }, use) => {
    await use(new OrderAPI(request, process.env.BASE_URL!));
  },

  createdOrderIds: async ({ orderAPI, authToken }, use) => {
    const ids: string[] = [];
    await use(ids);
    await Promise.all(ids.map((id) => orderAPI.delete(`/orders/${id}`, authToken)));
  },

  // This API has no DELETE /users/:id — cleanup is DELETE /users/me
  // We track tokens instead of IDs for cleanup
createdUserIds: async ({ request }, use) => {
  const cleanupTokens: string[] = [];  // store tokens, not IDs

  await use(cleanupTokens);

  // Delete each created user using their own token
  await Promise.all(
    cleanupTokens.map((token) =>
      request.delete(
        "https://practice.expandtesting.com/notes/api/users/me",
        { headers: { "x-auth-token": token } }
      )
    )
  );
},
});

export { expect } from "@playwright/test";