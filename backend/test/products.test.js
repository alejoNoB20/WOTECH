// import * as chai from 'chai'
// import supertest from 'supertest'
// import dotenv from 'dotenv'

// dotenv.config()

// const expect = chai.expect
// const requester = supertest(`http://localhost:${process.env.PORT}/products`);

// describe('Products Tests', function() {
//     describe('Get Products Test', () =>  {
//         it('EP: / should return the list of products', async () => {
//             const response = await requester.get('/')
//             expect(response.status).to.be.equal(200)
//         })
//     })

//     describe('Get Products Details Test', () => {
//         it('EP: /details/:id_product should return the details of a particular product', async () => {
//             const response = await requester.get('/details/2')
//             expect(response.status).to.be.equal(200)
//         })
//     })

//     describe('POST Create Product', () => {
//         const productMock = {
//                 "name_product": "test",
//                 "img_product": "test",
//                 "description_product": "test",
//                 "price_product": 5000,
//                 "tools": [10, 11],
//                 "materials": [
//                   {"id": 1, "how_much_content": 10},
//                   {"id": 4, "how_much_content": 15},
//                   {"id": 3, "how_much_content": 7}
//                 ]
//             }
//         //Be sure to delete the test product before running this test or change its name
//         it('EP: /create should create a new product on the DB', async () => {
//             const response = await requester.post('/create').send(productMock)
//             console.log(response);
            
//             expect(response.status).to.be.equal(201)
//         })
        
//         it('EP: /create should return error trying to create a product without name', async () => {
//             const response = await requester.post('/create').send(productMock)
//             expect(response.status).to.be.equal(409)
//         })
//     })

//     describe('PATCH Disabled Product', () => {
//         it('EP: /disabled/:id_product should set the field available into 1 (logical delete)', async () => {
//             const response = await requester.patch('/disabled/3')
//             expect(response.status).to.be.equal(200)
//         })

//         it('EP: /disabled/:id_product should fail setting the field available into 1 (logical delete) because non-existent id', async () => {
//             const response = await requester.patch('/disabled/9999')
//             expect(response.status).to.be.equal(204)
//         })
//     })

//     describe('PATCH delete Product', () => {
//         //You must modifie the ID before running this test or verify that the ID exists
//         it('EP: /delete/:id_product should remove the product from the DB', async () => {
//             const response = await requester.delete('/delete/12')
//             expect(response.status).to.be.equal(200)
//         })

//         it('EP: /delete/:id_product should fail to remove the product from the DB', async () => {
//             const response = await requester.delete('/delete/9999')
//             expect(response.status).to.be.equal(404)
//         })
//     })

//     describe('PATCH Update Product', () => {
//         const productMock = {
//                         "name_product": "testToUpdate",
//                         "img_product": "test",
//                         "description_product": "test",
//                         "price_product": 5000,
//                         "tools": [10, 11],
//                         "materials": [
//                           {"id": 1, "how_much_content": 10},
//                           {"id": 4, "how_much_content": 15},
//                           {"id": 3, "how_much_content": 7}
//                         ]
//         }
//         it('EP: /update/:id_product should update a particular product on the DB', async () => {
//             const response = await requester.patch('/update/4').send(productMock)
//             expect(response.status).to.be.equal(200)            
//         })
    
//         it('EP: /products/update/:id_product should fail to update a particular product on the DB', async () => {
//             const response = await requester.patch('/update/999').send(productMock)
//             expect(response.status).to.be.equal(404)            
//         })
//     })

//     describe('GET Search Product', () => {
//         it('EP: /search? should return all the matching products', async () => {
//             const response = await requester.get('/search?search_type=name_product&search_value=testToUpdate')
//             expect(response.status).to.be.equal(200)
//         })
//     })
// })