import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authentication',async({  request  })=>{
    await request.post('http://github.com/login',{
        form:{
            'user' : 'user',
            'password' : 'password'    
        }
    })
    await request.storageState({ path: authFile });
})