import * as chai from 'chai'
import supertest from 'supertest'
import { app, server } from '../src/app.js';
import { StockService } from '../src/Components/Stock/stockService.js';
import { ToolsService } from '../src/Components/Tools/toolsService.js';
import { productsService } from '../src/Components/Products/productsService.js';
import { clearDB } from '../src/database/connection.js';
const Stock = new StockService();
const Tool = new ToolsService();
const Product = new productsService();

const expect = chai.expect
const requester = supertest(app);

describe('Products Tests', function() {

    before(async () => {
        await clearDB();

        const ToolMock = {
            "name_tool": "Moladorass",
            "location_tool": "Cajon 33",
            "status_tool": "Habilitada"             
        };
        const StockMock = {
            "name_material": "Madera de pino",
            "measurement_material": "cm"
        };

        await Tool.crearHerramienta(ToolMock);
        await Stock.crearStock(StockMock);
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('Get Products Test (before created)', () =>  {
        it('EP: / should return the list of products', async () => {
            const response = await requester.get('/products')
            expect(response.status).to.be.equal(404)
        });
    });

    describe('POST Create Product', () => {
        const productMock = {
                "name_product": "test",
                "img_product": "test",
                "description_product": "test",
                "price_product": 5000,
                "tools": [1],
                "materials": [
                    {"id": 1, "how_much_content": 10}
                ]
            };

        it('EP: /create should create a new product on the DB', async () => {
            const response = await requester.post('/products/create').send(productMock)
            
            expect(response.status).to.be.equal(201)
        });
    });

    describe('Get Products Test (before created)', () =>  {
        it('EP: / should return the list of products', async () => {
            const response = await requester.get('/products')
            expect(response.status).to.be.equal(200)
        });
    });
    
    describe('Get Products Details Test', () => {
        it('EP: /details/:id_product should return the details of a particular product', async () => {
            const response = await requester.get('/products/details/1')
            expect(response.status).to.be.equal(200)
        });
    });
    
    describe('PATCH Update Product', () => {
        const productUpdateMock = {
                "name_product": "testToUpdate",
                "img_product": "test",
                "description_product": "test",
                "price_product": 5000,
                "tools": [1],
                "materials": [
                    {"id": 1, "how_much_content": 3}
                ]
            }
        it('EP: /update/:id_product should update a particular product on the DB', async () => {
            const response = await requester.patch('/products/update/1').send(productUpdateMock)
            expect(response.status).to.be.equal(200);            
        });
    });

    describe('GET Search Product', () => {
        it('EP: /search? should return all the matching products', async () => {
            const response = await requester.get('/products/search?search_type=name_product&search_value=testToUpdate')
            expect(response.status).to.be.equal(200)
        });
    });

    describe('PATCH Disabled Product', () => {
        it('EP: /disabled/:id_product should set the field available into 1 (logical delete)', async () => {
            const response = await requester.patch('/products/disabled/1')
            expect(response.status).to.be.equal(200)
        });
    });

    describe('PATCH delete Product', () => {
        // You must modifie the ID before running this test or verify that the ID exists
        it('EP: /delete/:id_product should remove the product from the DB', async () => {
            const response = await requester.delete('/products/delete/1')
            expect(response.status).to.be.equal(200)
        });
    })

});