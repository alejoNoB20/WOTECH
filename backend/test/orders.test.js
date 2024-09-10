// import * as chai from 'chai';
// import supertest from 'supertest';
// import dotenv from 'dotenv';
// import { StockController } from '../src/Components/Stock/stockController.js';
// import { ToolsController } from '../src/Components/Tools/toolsController.js';
// import { productsController } from '../src/Components/Products/productsController.js';
// import { clientsController } from '../src/Components/Clients/clientsController.js';
// const Stock = new StockController();
// const Tool = new ToolsController();
// const Product = new productsController();
// const Client = new clientsController();

// dotenv.config();

// const expect = chai.expect;
// const requester = supertest(`${process.env.DB_SERVER_URL}`);

// describe('Orders Tests', () => {

//     before(async () => {
//         const stockMock = {
//             "name_material": "Madera de pino",
//             "measurement_material": "cm"
//         };
//         const toolMock = {
//             "name_tool": "Martillo",
//             "location_tool": "Mueble 1",
//             "status_tool": "Habilitado"
//         };
//         const productMock = {
//             "name_product": "Mesa",
//             "price_product": 5800,
//             "tools": [1],
//             "stocks": [{
//                 "id": 1,
//                 "how_much_content": 28
//             }]
//         }
//         const clientMock = {
//             "name_client": "John",
//             "last_name_client": "Travolta",
//             "province_client": "Buenos Aires",
//             "direction_client": "Calle 123",
//             "phone_number_client": "84 153-4865",
//             "type_client": "Consumidor Final"
//         }

//         await Tool.pushHerramienta(toolMock);
//         await Stock.crear(stockMock);
//         await Product.crear(productMock);
//         await Client.crear(clientMock);
//     });

//     describe('Ver pedidos', () => {
//         it('EP: /orders/ En caso de no existir ningun pedido en la db, debería retornar un status 404', async () => {
//             const response = await requester.get('/orders');
//             expect(response.status).to.be.equal(404);
//         });
//     });

//     describe('Ver productos', () => {
//         it('EP: /orders/getCreate Debería mostrar una lista con los productos disponibles para encargar y retornar un status 200', async () => {
//             const response = await requester.get('/orders/getCreate');
//             expect(response.status).to.be.equal(200);
//         });
//     });

//     describe('Crear pedido', () => {
//         it('EP: /orders/create Debería crear un nuevo pedido en la db y devolver un status 201', async () => {
//             const orderMock = {
//                 "id_client_fk": 1,
//                 "delivery_day_order": "2024-08-08",
//                 "products": [{
//                     "id": 1,
//                     "price_product": 5800,
//                     "unit_product": 15
//                 }]
//             }
//             const response = await requester.post('/orders/create').send(orderMock);
//             expect(response.status).to.be.equal(201);
//         })
//     });

//     describe('Ver pedidos', () => {
//         it('EP: /orders/ Luego de haber creado un pedido debería retornar una lista con los pedidos con un status 200', async () => {
//             const response = await requester.get('/orders');
//             expect(response.status).to.be.equal(200);
//         });        
//     });

//     describe('Ver detalladamente un pedido', () => {
//         it('EP: /orders/details/:id_order Debería mostrar los detalles de un pedido y devolver un status 200', async () => {
//             const response = await requester.get('/orders/details/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Actualizar un pedido', () => {
//         it('EP: /orders/update/:id_order Debería actualizar un pedido y devolver un status 200', async () => {
//             const newOrderMock = {
//                 "id_client_fk": 1,
//                 "delivery_day_order": "2024-10-08",
//                 "products": [{
//                     "id": 1,
//                     "price_product": 4000,
//                     "unit_product": 5
//                 }]
//             }
//             const response = await requester.patch('/orders/update/1').send(newOrderMock);
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Eliminado lógico de un pedido', () => {
//         it('EP: /orders/disabled/:id_order Debería realizar un eliminado lógico de un pedido y devolver un status 200', async () => {
//             const response = await requester.patch('/orders/disabled/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Eliminado total de un pedido', () => {
//         it('EP: /orders/delete/:id_order Debería realizar un eliminado total de un pedido y devolver un status 200', async () => {
//             const response = await requester.delete('/orders/delete/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });
    
// });
