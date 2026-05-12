import { test as baseTest, request } from '@playwright/test';
import { BaseAPI } from '../api/user.api';
import { OrderAPI } from '../api/orders.api';

type Apifixtures={
    orderAPI: OrderAPI,
    baseAPI : BaseAPI,
    userAPI: 
}