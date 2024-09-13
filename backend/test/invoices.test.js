// import * as chai from 'chai'
// import supertest from 'supertest'
// import dotenv from 'dotenv'
// import {Invoices} from '../src/Components/Invoices/invoicesModels.js'
// import { clearDB } from '../src/database/connection.js'
// import { app, server } from '../src/app.js';
// import { Supplier } from '../src/Components/Suppliers/suppliersModels.js'

// dotenv.config()

// const expect = chai.expect
// const requester = supertest(app);

// describe('Invoices Tests', function() {

//     before(async () => {
//         await clearDB();

//         const supplierMock = {
//             "name_company_supplier": "Test",
//             "tax_address_supplier": "Avenida 2321",
//             "number_phone_company_supplier": "341 814-2345"
//         };
//         await requester.post('/suppliers/create').send(supplierMock);


//         const invoiceMock = {
//             id_supplier_fk: 3,
//             invoice: "test"
//         }
//         await Invoices.create(invoiceMock)
//     });

//     after(async () => {
//         server.close(() => console.log('El server cerró correctamente'));
//     })

//     describe('Get /:id_supplier', () => {
//         it('EP: /id_supplier should return all the bills asociated with a supplier', async () => {
//             const response = await requester.get('/2')
            
//             expect(response.status).to.be.equal(200)
//         })
//     })

//     describe('Post /push', () => {
//         it('EP: /push ', async () => {
//             const invoiceMock = {
//                 id_supplier: 2,
//                 invoice: "test"
//             }
//             const response = await requester.post('/push').send(invoiceMock)

//             expect(response.status).to.be.equal(201)
//         })
//     })

//     describe('Patch /disabled/:id_invoice', () => {
//         it('EP: /disabled/:id_invoice should set a bill as disabled', async () => {
//             const response = await requester.patch('/disabled/1')
//             expect(response.status).to.be.equal(200)
//         })
//     })
// })





