import * as chai from 'chai';
import supertest from 'supertest';
import { app, server } from '../src/app.js';
import { clearDB } from '../src/database/connection.js';
import { StockService } from '../src/Components/Stock/stockService.js';
import { ToolsService } from '../src/Components/Tools/toolsService.js';
import { clientsService } from '../src/Components/Clients/clientsService.js'; 
import { productsService } from '../src/Components/Products/productsService.js'; 
const Stock = new StockService();
const Tool = new ToolsService();
const Client = new clientsService();
const Product = new productsService();

const expect = chai.expect;
const requester = supertest(app);

describe('Orders Tests', () => {
    
    before(async () =>{
        await clearDB();

        const stockMock = {
            "name_material": "Madera de pino",
            "measurement_material": "cm"
        };
        const toolMock = {
            "name_tool": "Martillo",
            "location_tool": "Mueble 1"
        };
        const productMock = {
            "name_product": "Mesa",
            "price_product": 5800,
            "tools": [1],
            "materials": [{
                "id": 1,
                "how_much_content": 28
            }]
        };
        const clientMock = {
            "name_client": "John",
            "last_name_client": "Travolta",
            "dni_client": "38159467",
            "province_client": "Buenos Aires",
            "direction_client": "Calle 123",
            "phone_number_client": "84 153-4865",
            "type_client": "Consumidor Final"
        };

        await Stock.crearStock(stockMock);
        await Tool.crearHerramienta(toolMock);
        await Client.crearCliente(clientMock);
        await Product.crearProducto(productMock);

    });

    after( () => {
        server.close(() => console.log('El server cerró correctamente'));
    });
    
    describe('GET: Ver pedidos (sin registros)', () => {
        it('EP: /orders/ En caso de no existir ningun pedido en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/orders');

            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.equal('No se encontraron pedidos activos en la base de datos');
        });
    });
    
    
    describe('POST: Crear pedido', () => {
        it('EP: /orders/create Debería crear un nuevo proveedor en la db y devolver un status 201', async () => {
            const orderMock = {
                "id_client_fk": 1,
                "delivery_day_order": "2024-08-08",
                "products": [{
                    "id": 1,
                    "price_product": 5800,
                    "unit_product": 10
                }]
            };
            
            const response = await requester.post('/orders/create').send(orderMock);
            const amount_material_verification = await requester.get('/stock/details/1');
            
            expect(response.status).to.be.equal(201);
            expect(response.body).to.be.equal('La creación del pedido finalizó exitosamente');
            expect(amount_material_verification.status).to.be.equal(200);
            expect(amount_material_verification.body[0].amount_material).to.be.equal(-280);
        });
    });
    
    describe('GET: Ver productos (con registros)', () => {
        it('EP: /orders/getProducts Debería devolver una lista con los productos cargados en db con un status 200', async () => {
            const response = await requester.get('/orders/getProducts');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name_product).to.be.equal('Mesa');
        });        
    });

    describe('GET: Ver pedidos (con registros)', () => {
        it('EP: /orders/ Luego de haber creado un pedido debería retornar una lista de pedidos con status 200', async () => {
            const response = await requester.get('/orders');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].delivery_day_order).to.be.equal('2024-08-08');
        });        
    });

    describe('GET: Ver detalladamente un pedido', () => {
        it('EP: /orders/details/:id_order Debería mostrar los detalles de un pedido y devolver un status 200', async () => {
            const response = await requester.get('/orders/details/1');

            expect(response.status).to.be.equals(200);
            expect(response.body[0].delivery_day_order).to.be.equal('2024-08-08');
            expect(response.body[0]).to.have.property('products');
        });
    });

    describe('PATCH: Actualizar un pedido', () => {
        it('EP: /orders/update/:id_order Debería actualizar un pedido y devolver un status 200', async () => {
            const newOrderModal = {
                "id_client_fk": 1,
                "delivery_day_order": "2024-09-08",
                "products": [{
                    "id": 1,
                    "price_product": 5800,
                    "unit_product": 5
                }]
            };
            const response = await requester.patch('/orders/update/1').send(newOrderModal);
            const amount_material_verification = await requester.get('/stock/details/1');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.equal('La actualización del pedido finalizó exitosamente');
            expect(amount_material_verification.status).to.be.equal(200);
            expect(amount_material_verification.body[0].amount_material).to.be.equal(-140);
        });
    }); 

    describe('PATCH: Eliminado lógico de un pedido', () => {
        it('EP: /orders/disabled/:id_order Debería realizar un eliminado lógico de un pedido y devolver un status 200', async () => {
            const response = await requester.patch('/orders/disabled/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('El pedido se cerró con éxito');
        });
    });

    describe('DELETE: Eliminado total de un pedido', () => {
        it('EP: /orders/delete/:id_order Debería realizar un eliminado total de un pedido y devolver un status 200', async () => {
            const response = await requester.delete('/orders/delete/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La eliminación del pedido finalizó exitosamente');
        });
    });
});
