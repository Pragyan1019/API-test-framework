import {expect,test} from "../fixtures/api.fixture";
import { testData } from "../data";

test.describe("Orders API", async () => {
    test('creating an order', async ({ orderAPI,authToken,createdOrderIds }) => {
        const order = await orderAPI.create(testData.create(), authToken);
        createdOrderIds.push(order.id);

        expect(order).toMatchObject({
            userId: expect.any(String),
            status: 'pending',
            total:expect.any(Number),
        })        
    });

    test('status from pending to confirmed', async ({ orderAPI, authToken, createdOrderIds }) => {
        const order = await orderAPI.create(testData.create(), authToken);
        createdOrderIds.push(order.id);

        const updated = await orderAPI.updateStatus(order.id, 'confirmed', authToken);
        expect(updated.status).toBe('confirmed');
  });
     test('invalid status transition returns 400', async ({ orderAPI, authToken, createdOrderIds }) => {
        const order = await orderAPI.create(testData.create(), authToken);
        createdOrderIds.push(order.id);

        await orderAPI.updateStatus(order.id, 'delivered', authToken);

        await expect(
        orderAPI.updateStatus(order.id, 'pending', authToken)
        ).rejects.toThrow('400');
  });
});