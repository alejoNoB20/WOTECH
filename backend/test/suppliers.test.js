import * as chai from 'chai';
import supertest from 'supertest';
import { clearDB } from '../src/database/connection.js';
import { app, server } from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Suppliers Tests', () => {

    before(async () => {
        await clearDB();
    });

    after( () => {
        server.close(() => console.log('El server cerró correctamente'))
    })

    describe('GET: Ver proveedores (sin registros)', () => {
        it('EP: /suppliers/ En caso de no existir ningun proveedor en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/suppliers');

            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.equal('No se encontró ningún proveedor en la base de datos');
        });
    });

    describe('POST: Crear proveedor (success)', () => {
        it('EP: /suppliers/create Debería crear un nuevo proveedor en la db y devolver un status 201', async () => {
            const firstSupplierMock = {
                "name_company_supplier": "The Coca-Cola Company",
                "tax_address_supplier": "Amancio Avenida 3570",
                "number_phone_company_supplier": "341 814-8453"
            };
            const secondSupplierMock = { 
                "name_company_supplier": "PepsiCo",
                "tax_address_supplier": "Av. Circunvalación 25 de Mayo 7790",
                "number_phone_company_supplier": "3878 44-3414"
            };

            const firstResponse = await requester.post('/suppliers/create').send(firstSupplierMock);
            const secondResponse = await requester.post('/suppliers/create').send(secondSupplierMock);

            expect(firstResponse.status).to.be.equal(201);
            expect(firstResponse.body).to.be.equal('La creación del proveedor finalizó exitosamente');
            expect(secondResponse.status).to.be.equal(201);
            expect(secondResponse.body).to.be.equal('La creación del proveedor finalizó exitosamente');
        })
    });

    describe('POST: Crear proveedor (fail)', () => {
        it('EP: /suppliers/create Debería crear un nuevo proveedor con el mismo nombre de uno ya creado, por lo que va a devolver un status 400', async () => {
            const failSupplierMock = {
                "name_company_supplier": "The Coca-Cola Company",
                "tax_address_supplier": "Amancio Avenida 3570",
                "number_phone_company_supplier": "341 814-8453"
            };

            const failResponse = await requester.post('/suppliers/create').send(failSupplierMock);

            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Ya existe una companía con el mismo nombre');
        })
    });

    describe('GET: Ver proveedores (con registros)', () => {
        it('EP: /suppliers/ Luego de haber creado un proveedor debería retornar una lista de proveedores con status 200', async () => {
            const response = await requester.get('/suppliers');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name_company_supplier).to.be.equal('The Coca-Cola Company');
        });        
    });

    describe('GET: Ver detalladamente un proveedor', () => {
        it('EP: /suppliers/details/:id_supplier Debería mostrar los detalles de un proveedor y devolver un status 200', async () => {
            const response = await requester.get('/suppliers/details/1');

            expect(response.status).to.be.equals(200);
            expect(response.body[0].name_company_supplier).to.be.equal('The Coca-Cola Company');
            expect(response.body[0]).to.have.property('stocks');
        });
    });

    describe('PATCH: Actualizar un proveedor (success)', () => {
        it('EP: /suppliers/update/:id_supplier Debería actualizar un proveedor y devolver un status 200', async () => {
            const newSupplierModal = {
                "name_company_supplier": "The Coca-Cola Company",
                "tax_address_supplier": "Amancio Avenida 3570",
                "number_phone_company_supplier": "341 814-8453",
                "reason_social_supplier": "Companía Servicios de Bebidas Refrescantes, S.L"
            };
            const response = await requester.patch('/suppliers/update/1').send(newSupplierModal);

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La actualización del proveedor finalizó exitosamente');
        });
    });

    describe('PATCH: Actualizar un proveedor (fail)', () => {
        it('EP: /suppliers/update/:id_supplier Debería actualizar un proveedor, pero va a tener el mismo nombre que otro proveedor en la db por lo tanto devolver un status 400', async () => {
            const failSupplierModal = {
                "name_company_supplier": "PepsiCo",
                "tax_address_supplier": "Amancio Avenida 3570",
                "number_phone_company_supplier": "341 814-8453",
                "reason_social_supplier": "Companía Servicios de Bebidas Refrescantes, S.L"
            };
            const failResponse = await requester.patch('/suppliers/update/1').send(failSupplierModal);
            
            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Ya existe una companía con el mismo nombre');
        });
    });    

    describe('PATCH: Eliminado lógico de un proveedor', () => {
        it('EP: /suppliers/disabled/:id_supplier Debería realizar un eliminado lógico de un proveedor y devolver un status 200', async () => {
            const response = await requester.patch('/suppliers/disabled/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La deshabilitación del proveedor finalizó exitosamente');
        });
    });

    describe('DELETE: Eliminado total de un proveedor', () => {
        it('EP: /suppliers/delete/:id_supplier Debería realizar un eliminado total de un proveedor y devolver un status 200', async () => {
            const response = await requester.delete('/suppliers/delete/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La eliminación del proveedor finalizó exitosamente');
        });
    });
});