export const  testData = {
    create(){
        return{
            userId: "12345",
            items:[
                {productId:"123",qty:1},
                {productId:"456",qty:2},
                {productId:"789",qty:3}
            ],
            shippingAddress:{
                street:"123 Main St",
                city:"Anytown",
                zip:"12345"
            }
        
        }
    }
}