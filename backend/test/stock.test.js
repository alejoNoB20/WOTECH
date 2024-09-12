import * as chai from 'chai';
import supertest from 'supertest';
import { app, server } from '../src/app.js';
import { clearDB } from '../src/database/connection.js'

const expect = chai.expect;
const requester = supertest(app);

describe('Stock Tests', () => {
    
    before(async () => {
        await clearDB();
    });

    after( () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('GET: Ver stock (sin registros)', () => {
        it('EP: /stock/ En caso de no existir ningun material en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/stock');

            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.equal('No se encontró ningún stock en la base de datos');
        });
    });

    describe('POST: Crear stock (success)', () => {
        it('EP: /stock/create Debería crear un nuevo stock en la db y devolver un status 201', async () => {
            const firstStockMock = {
                "name_material": "Madera de pino",
                "measurement_material": "cm"
            };
            const secondStockMock = {
                "name_material": "Clavos de 20cm",
                "measurement_material": "unidad"                
            };

            const firstResponse = await requester.post('/stock/create').send(firstStockMock);
            const secondResponse = await requester.post('/stock/create').send(secondStockMock);

            expect(firstResponse.status).to.be.equal(201);
            expect(firstResponse.body).to.be.equal('La creación del stock finalizó exitosmente');
            expect(secondResponse.status).to.be.equal(201);
            expect(secondResponse.body).to.be.equal('La creación del stock finalizó exitosmente');
        })
    });

    describe('POST: Crear stock (fail)', () => {
        it('EP: /stock/create Debería crear un nuevo stock con el mismo nombre de uno ya creado, por lo que va a devolver un status 400', async () => {
            const failStockMock = {
                "name_material": "Madera de pino",
                "measurement_material": "cm"
            };

            const failResponse = await requester.post('/stock/create').send(failStockMock);

            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Hay un stock con el mismo nombre en la base de datos');
        })
    });

    describe('GET: Ver stock (con registros)', () => {
        it('EP: /stock/ Luego de haber creado un material debería retornar una lista con materiales con status 200', async () => {
            const response = await requester.get('/stock');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name_material).to.be.equal('Madera de pino');
        });        
    });

    describe('GET: Ver detalladamente un stock', () => {
        it('EP: /stock/details/:id_material Debería mostrar los detalles de un material y devolver un status 200', async () => {
            const response = await requester.get('/stock/details/1');

            expect(response.status).to.be.equals(200);
            expect(response.body[0].name_material).to.be.equal('Madera de pino');
            expect(response.body[0]).to.have.property('products');
        });
    });

    describe('PATCH: Actualizar un stock (success)', () => {
        it('EP: /stock/update/:id_material Debería actualizar un material y devolver un status 200', async () => {
            const newStockModal = {
                "name_material": "Madera de pino",
                "description_material": "Madera de pino comprada de Jorgito S.R.L",
                "measurement_material": "cm"
            };

            const response = await requester.patch('/stock/update/1').send(newStockModal);

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La actualización del stock finalizó exitosamente');
        });
    });

    describe('PATCH: Actualizar un stock (fail)', () => {
        it('EP: /stock/update/:id_material Debería actualizar un material, pero va a tener el mismo nombre que otro stock en la db por lo tanto devolver un status 400', async () => {
            const failStockModal = {
                "name_material": "Clavos de 20cm",
                "description_material": "Madera de pino comprada de Jorgito S.R.L",
                "measurement_material": "unidad"
            };

            const failResponse = await requester.patch('/stock/update/1').send(failStockModal);
            
            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Hay un stock con el mismo nombre en la base de datos');
        });
    });    

    describe('PATCH: Eliminado lógico de un stock', () => {
        it('EP: /stock/disabled/:id_material Debería realizar un eliminado lógico de un material y devolver un status 200', async () => {
            const response = await requester.patch('/stock/disabled/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La deshabilitación del stock con finalizó exitosamente');
        });
    });

    describe('DELETE: Eliminado total de un stock', () => {
        it('EP: /stock/delete/:id_material Debería realizar un eliminado total de un material y devolver un status 200', async () => {
            const response = await requester.delete('/stock/delete/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La eliminación del stock con finalizó exitosamente');
        });
    });
});
