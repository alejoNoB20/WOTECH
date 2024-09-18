import * as chai from 'chai'
import supertest from 'supertest'
import { invoicesService } from '../src/Components/Invoices/invoicesService.js';
import { clearDB } from '../src/database/connection.js'
import { app, server } from '../src/app.js';
import { supplierService } from '../src/Components/Suppliers/suppliersService.js';
const Invoices = new invoicesService();
const Supplier = new supplierService();

const expect = chai.expect
const requester = supertest(app);

describe('Invoices Tests', function() {

    before(async () => {
        await clearDB();

        const supplierMock = {
            "name_company_supplier": "Test",
            "tax_address_supplier": "Avenida 2321",
            "number_phone_company_supplier": "341 814-2345"
        };
        await Supplier.crearProveedor(supplierMock);
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('Post /push', () => {
        it('EP: /push ', async () => {
            const invoiceMock = {
                "id_supplier_fk": 1,
                "invoice": "test"
            }
            const response = await requester.post('/suppliers/invoices/push').send(invoiceMock);
            
            expect(response.status).to.be.equal(201)
        });
    });

    describe('Get /:id_supplier', () => {
        it('EP: /id_supplier should return all the bills asociated with a supplier', async () => {
            const response = await requester.get('/suppliers/invoices/1')
            
            expect(response.status).to.be.equal(200)
        });
    });
    
    describe('Patch /disabled/:id_invoice', () => {
        it('EP: /disabled/:id_invoice should set a bill as disabled', async () => {
            const response = await requester.patch('/suppliers/invoices/disabled/1')
            expect(response.status).to.be.equal(200)
        })
    })
})





