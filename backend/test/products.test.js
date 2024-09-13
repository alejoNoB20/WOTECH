import * as chai from 'chai'
import supertest from 'supertest'
import dotenv from 'dotenv'
import { app, server } from '../src/app.js';
import { Products } from '../src/Components/Products/productsModels.js';
import { clearDB } from '../src/database/connection.js';
import { Tools } from '../src/Components/Tools/toolsModels.js';

dotenv.config()

const expect = chai.expect
const requester = supertest(app);

describe('Products Tests', function() {

    before(async () => {
        await clearDB();
        const secondToolMock = {
            "name_tool": "Moladorass",
            "location_tool": "Cajon 33",
            "status_tool": "Habilitada"             
        };
        await Tools.create(secondToolMock)
        const productMock = {
            "name_product": "testPrev",
            "img_product": "testPrev",
            "description_product": "testPrev",
            "price_product": 5000,
            "tools": [1],
            "materials": [
              {"id": 1, "how_much_content": 10},
              {"id": 4, "how_much_content": 15},
              {"id": 3, "how_much_content": 7}
            ]
        }
        await Products.create(productMock)
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('Get Products Test', () =>  {
        it('EP: / should return the list of products', async () => {
            const response = await requester.get('/products/')
            expect(response.status).to.be.equal(200)
        })
    })

    describe('Get Products Details Test', () => {
        it('EP: /details/:id_product should return the details of a particular product', async () => {
            const response = await requester.get('/products/details/1')
            expect(response.status).to.be.equal(200)
        })
    })

    describe('POST Create Product', () => {
        const productMock = {
                "name_product": "test",
                "img_product": "test",
                "description_product": "test",
                "price_product": 5000,
                "tools": [1],
                "materials": [
                  {"id": 1, "how_much_content": 10},
                  {"id": 4, "how_much_content": 15},
                  {"id": 3, "how_much_content": 7}
                ]
            }
        //Be sure to delete the test product before running this test or change its name
        it('EP: /create should create a new product on the DB', async () => {
            const response = await requester.post('/products/create').send(productMock)
            
            expect(response.status).to.be.equal(201)
        })
        
        it('EP: /create should return error trying to create a product without name', async () => {
            const response = await requester.post('/products/create').send(productMock)
            expect(response.status).to.be.equal(409)
        })
    })

    describe('PATCH Disabled Product', () => {
        it('EP: /disabled/:id_product should set the field available into 1 (logical delete)', async () => {
            const response = await requester.patch('/products/disabled/2')
            expect(response.status).to.be.equal(200)
        })

        it('EP: /disabled/:id_product should fail setting the field available into 1 (logical delete) because non-existent id', async () => {
            const response = await requester.patch('/products/disabled/9999')
            expect(response.status).to.be.equal(204)
        })
    })

    describe('PATCH delete Product', () => {
        //You must modifie the ID before running this test or verify that the ID exists
        it('EP: /delete/:id_product should remove the product from the DB', async () => {
            const response = await requester.delete('/products/delete/2')
            expect(response.status).to.be.equal(200)
        })

        it('EP: /delete/:id_product should fail to remove the product from the DB', async () => {
            const response = await requester.delete('/products/delete/9999')
            expect(response.status).to.be.equal(404)
        })
    })

    describe('PATCH Update Product', () => {
        const productMock = {
                        "name_product": "testToUpdate",
                        "img_product": "test",
                        "description_product": "test",
                        "price_product": 5000,
                        "tools": [1],
                        "materials": [
                          {"id": 1, "how_much_content": 10},
                          {"id": 4, "how_much_content": 15},
                          {"id": 3, "how_much_content": 7}
                        ]
        }
        // it('EP: /update/:id_product should update a particular product on the DB', async () => {
        //     const response = await requester.patch('/products/update/1').send(productMock)
        //     expect(response.status).to.be.equal(200)            
        // })
    
        it('EP: /products/update/:id_product should fail to update a particular product on the DB', async () => {
            const response = await requester.patch('/products/update/999').send(productMock)
            expect(response.status).to.be.equal(404)            
        })
    })

    describe('GET Search Product', () => {
        it('EP: /search? should return all the matching products', async () => {
            const response = await requester.get('/products/search?search_type=name_product&search_value=testToUpdate')
            expect(response.status).to.be.equal(200)
        })
    })
})